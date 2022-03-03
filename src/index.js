import {
    LitElement,
    html,
    css
} from "lit";

class HASpotifySonosCard extends LitElement {
    static get properties() {
        return {
            hass: {},
            config: {},
            playlists: [],
            accounts: [],
            activeAccount: false,
            activeTab: false,
        };
    }
    setConfig(config) {
        if (!config.entity_id) {
            throw new Error("You need to define a main entity");
        }
        this.config = config;
        
        this.CheckForHass();
    }
    CheckForHass(){
        let that = this
        if(this.hass && this.hass.auth){
            this.HassAcquired()
        }else{
            setTimeout(function(){
                that.CheckForHass();
            }, 10);
        }
    }
    HassAcquired(){
        this.FetchAccounts();
    }
    FetchAccounts(){
        var accounts = [];
        for(var i=0;i<this.config.spotify_accounts.length;i++){
            let id = this.config.spotify_accounts[i].id;
            accounts[id] = {
                id: id,
                playlists: [],
                albums:[],
                artists:[],
                recent:[],
                name: this.config.spotify_accounts[i].name
            }
        }
        this.accounts = accounts;
        for(var i=0;i<this.config.spotify_accounts.length;i++){
            this.FetchRecords(this.config.spotify_accounts[i].id, "playlists");
            this.FetchRecords(this.config.spotify_accounts[i].id, "albums");
            //this.FetchRecords(this.config.spotify_accounts[i].id, "artists");
            this.FetchRecords(this.config.spotify_accounts[i].id, "recent");
        }
        this.activeAccount = this.config.spotify_accounts[0].id;
        this.activeTab = "playlists";
    }
    FetchRecords(account, type){
        if(!type || !account){
            return
        }
        let t;
        if(type=="playlists"){
            t = "current_user_playlists"
        }else if(type=="albums"){
            t = "current_user_saved_albums"
        }else if(type=="artists"){
            t = "current_user_followed_artists"
        }else if(type=="recent"){
            t = "current_user_recently_played"
        }

        
        let that = this;
        this.hass.callWS({
            entity_id: account,
            media_content_id: t,
            media_content_type: t,
            type: "media_player/browse_media"
        }).then(function (response) {
            let ar = [];
            let limit = 24;
            if(that.config.grid_limit){
                limit = that.config.grid_limit;
            }
            for(var i=0;i<response.children.length;i++){
                if(ar.length<limit){
                    if(type=="recent"){
                        //only add if it's not an artist
                        if(response.children[i].media_content_type!="artist"){
                            ar.push(response.children[i]);
                        }
                    }else{
                        ar.push(response.children[i]);
                    }
                }
            }
            that.accounts[account][type] = ar;
        });
    }
    triggerGroup(el, group) {
        let that = this;
        let currentPlayerState = this.hass.states[this.config.entity_id];
        let currentPlayerVolume = currentPlayerState.attributes.volume_level;
        let properVolume = group.volume;
        if(currentPlayerVolume != properVolume){
            //set the volume
            this.hass.callService("media_player", "volume_set", {
                volume_level: properVolume,
                entity_id: this.config.entity_id
            }).catch(function(err){
                console.log("failed to set volume")
                console.log(err)
            })
        }
        //group correctly
        //get current grop list
        let currentGroup = currentPlayerState.attributes.sonos_group;
        //remove the master player from the group
        currentGroup.splice(currentGroup.indexOf(this.config.entity_id), 1);
        //properGroup
        let properGroup = [];
        if(group.players && group.players !== null && group.players.length > 0){
            for(var i=0;i<group.players.length;i++){
                properGroup.push(group.players[i].entity_id);
            }
        }
        console.log("Join players")
        //join all the needed players
        for(var i=0;i<properGroup.length;i++){
            if(currentGroup.indexOf(properGroup[i])==-1){
                console.log("adding player to group");
                console.log("master: "+this.config.entity_id);
                console.log("player: "+properGroup[i]);
                this.hass.callService("sonos", "join", {
                    master: this.config.entity_id,
                    entity_id: properGroup[i]
                }).catch(function(err){
                    console.log("failed to join")
                    console.log(err)
                })
            }
        }
        setTimeout(function(){
            //remove unneeded players
            for(var i=0;i<currentGroup.length;i++){
                if(properGroup.indexOf(currentGroup[i])==-1){
                    that.hass.callService("sonos", "unjoin", {
                        entity_id: currentGroup[i]
                    }).catch(function(err){
                        console.log("failed to remove player")
                        console.log(err)
                    })
                }
            }
            //set proper volumes
            for(var i=0;i<properGroup.length;i++){
                let properVolume = group.players[i].volume;
                let playerVolume = that.hass.states[properGroup[i]].attributes.volume_level;
                if(playerVolume!=properVolume){
                    that.hass.callService("media_player", "volume_set", {
                        volume_level: properVolume,
                        entity_id: properGroup[i]
                    }).catch(function(err){
                        console.log("failed to set volume")
                        console.log(err)
                    })
                }
            }
            //set media if required
            if(group.media){
                that.hass.callService("media_player", "play_media", {
                    media_content_type: "music",
                    media_content_id: group.media,
                    entity_id: that.config.entity_id
                }).catch(function(err){
                    console.log("failed to set media")
                    console.log(err)
                })
            }
        }, 1500);
        




    }
    IsGroupActive(group){
        //is this player volume level correct?
        let currentPlayerVolume = this.hass.states[this.config.entity_id].attributes.volume_level;
        let groupVolume = group.volume;
        if(currentPlayerVolume != groupVolume){
            return false;
        }

        //are there the same number of players in the group as currently connected?
        const currentPlayers = this.hass.states[this.config.entity_id].attributes.sonos_group;
        let groupPlayers = group.players;
        //current players list includes this master player, so remove 1
        if(groupPlayers && groupPlayers!==null && groupPlayers.length>0){
            if((currentPlayers.length-1)!=groupPlayers.length){
                return false
            }
        }else{
            groupPlayers = []
        }
        //check that all group players are currently connected
        for(var i=0;i<groupPlayers.length;i++){
            let playerId = groupPlayers[i].entity_id;
            if(currentPlayers.indexOf(playerId)==-1){
                return false
            }
        }
        //check that all players have the correct volume
        for(var i=0;i<groupPlayers.length;i++){
            let playerId = groupPlayers[i].entity_id;
            let correctVolume = groupPlayers[i].volume;
            let playerVolume = this.hass.states[playerId].attributes.volume_level;
            if(playerVolume!=correctVolume){
                return false
            }
        }
        return true;
    }
    DisplayGroups(){
        if(this.config.groups && this.config.groups!==null && this.config.groups.length > 0){
            return html`
            <ul class="grid grid-3">
                ${this.config.groups.map(group => {
                    let className = "group-trigger"
                    let groupActive = this.IsGroupActive(group);
                    if(groupActive){
                        className += " active"
                    }
                    return html`
                    <li>
                        <div class="container">
                            <div class="inner">
                                <div 
                                    class="${className}" 
                                    @click=${(elem) => this.triggerGroup(elem, group)}
                                >
                                    ${group.name}
                                </div>
                            </div>
                        </div>
                    </li>
                    `
                })}
            </ul>
            `;
        }else{
            return html``;
        }
    }
    DisplayPlayOptions(){
        let account = this.accounts[this.activeAccount];
        let list = account[this.activeTab];
        
        //if list array is less than 12, fill with empty objects
        let arLen = this.config.grid_limit;
        if(list.length < arLen){
            for(var i=list.length;i<arLen;i++){
                list.push({
                    title: false
                })
            }
        }

        return html`
        <ul class="grid grid-3">
            ${list.map(playlist => {
                if(playlist.title){
                    return html`
                    <li>
                        <div class="container">
                            <div class="inner">
                                <div 
                                    class="playlist-trigger" 
                                    @click=${(elem) => this.triggerPlaylist(elem, playlist)}
                                    style="background-image: url(${playlist.thumbnail})"
                                >
                                    <div class="playlist-name">${playlist.title}</div>
                                </div>
                            </div>
                        </div>
                    </li>
                    `
                }else{
                    return html`
                        <li>
                            <div class="container">
                                <div class="inner">
                                    <div 
                                        class="playlist-trigger" 
                                        style=""
                                    >
                                        <div class="playlist-name"></div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    `;
                }
            })}
        </ul>
        `;
    }
    DisplayLinkedPlayers(mediaPlayerObj){
        if(this.config.show_linked_players && mediaPlayerObj.attributes && mediaPlayerObj.attributes.sonos_group && mediaPlayerObj.attributes.sonos_group.length > 1){
            let namesArray = [];
            for(var i=0;i<mediaPlayerObj.attributes.sonos_group.length; i++){
                let name = this.hass.states[mediaPlayerObj.attributes.sonos_group[i]].attributes.friendly_name;
                namesArray.push(name);
            }
            return html`
            <div class="grouped-players-list">${namesArray.join(", ")}</div>
            `;
        }else{
            return html``;
        }
    }
    DisplayHeader(mediaPlayerObj){
        if(this.config.show_header){
            return html`
                <div class="header">
                    <div class="header-meta">
                        <div class="player-title">${mediaPlayerObj.attributes.friendly_name}</div>
                        <div class="song-title">${mediaPlayerObj.attributes.media_title}</div>
                        <div class="album-title">${mediaPlayerObj.attributes.media_album_name}</div>
                        <div class="artist-title">${mediaPlayerObj.attributes.media_artist}</div>
                    </div>
                    <div class="header-art">
                        <div class="container">
                            <div class="inner" style="background-image: url('${mediaPlayerObj.attributes.entity_picture}')"></div>
                        </div>
                    </div>
                </div>
            `
        }else{
            return html``;
        }
    }
    SetListType(el, type){
        this.activeTab = type;
    }
    SetActiveAccount(el, account_id){
        this.activeAccount = account_id;
    }
    DisplayAccounts(){
        let that = this;
        if(!this.accounts || Object.keys(this.accounts).length < 1){
            return html``;
        }
        return html`
            <ul class="tabs block">
                ${Object.keys(this.accounts).map(account_id => {
                    let ac = that.accounts[account_id];
                    let className = "";
                    if(that.activeAccount == account_id){
                        className = "active"
                    }
                    return html`<li class="${className}" @click=${(elem) => this.SetActiveAccount(elem, account_id)}>${ac.name}</li>`
                })}
            </ul>
        `;
    }
    DisplayTabs(){
        if(!this.activeAccount || !this.activeTab){
            return html``;
        }

        let playlistClassName = "";
        let albumClassName = "";
        let recentClassName = "";
        if(this.activeTab=="playlists"){
            playlistClassName = "active"
        }else if(this.activeTab=="albums"){
            albumClassName = "active"
        }else if(this.activeTab=="recent"){
            recentClassName = "active"
        }

        return html`
            ${this.DisplayAccounts()}
            <ul class="tabs">
                <li class="${playlistClassName}" @click=${(elem) => this.SetListType(elem, "playlists")}>Playlists</li>
                <li class="${albumClassName}" @click=${(elem) => this.SetListType(elem, "albums")}>Albums</li>
                <li class="${recentClassName}" @click=${(elem) => this.SetListType(elem, "recent")}>Recent</li>
            </ul>
        `;
    }
    render() {
        const mediaPlayerObj = this.hass.states[this.config.entity_id];

        if(!this.activeAccount || !this.activeTab){
            return html`Loading...`;
        }

        return html`
            <ha-card
                header="${this.config.name}"
            >
                
                ${this.DisplayHeader(mediaPlayerObj)}
                ${this.DisplayTabs()}
                ${this.DisplayPlayOptions()}
               
                ${this.DisplayGroups()}
                ${this.DisplayLinkedPlayers(mediaPlayerObj)}
            </ha-card>
    `;
    }
    triggerPlaylist(elem, playlist) {
        let t = "music";
        if(playlist.media_content_type=="artist"){
            t = "artist";
        }
        this.hass.callService("media_player", "play_media", {
            media_content_type: t,
            media_content_id: playlist.media_content_id,
            entity_id: this.config.entity_id
        }).catch(function(err){
            console.log("failed")
            console.log(err)
        })
        
    }

    // The height of your card. Home Assistant uses this to automatically
    // distribute all cards over the available columns.
    getCardSize() {
        return 8 + 1;
    }

    static get styles() {
        return css`
        :host {

        }
        ul.grid{
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-wrap: wrap;
        }
        ul.grid li{
            width: 25%;
            max-width: 200px;
            min-width: 100px;
            position: relative;
        }
        ul.grid.grid-3 li{
            width: 33.33%;
        }
        ul.grid li .container{
            padding-top: 100%;
            position: relative;
        }
        ul.grid li .container .inner{
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .group-trigger{
            position: absolute;
            left: 2px;
            right: 2px;
            top: 2px;  
            bottom: 2px;
            border: 1px solid #353535;
            background-color: #1C1C1C;
            color: #DEDEDE;
            font-size: 1.4em;
            font-weight: bold;
            white-space: nowrap; 
            overflow: hidden;
            text-overflow: ellipsis;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }
        .group-trigger:active{
            background-color: #373737;
        }
        .group-trigger.active:after{
            content: "";
            position: absolute;
            right: 5px;
            top: 5px;
            height: 5px;
            width: 5px;
            border-radius: 50%;
            background-color: #DEDEDE;
        }
        .grouped-players-list{
            padding: 5px;
            font-style: italic;
        }
        .header{
            padding: 10px;
            display: flex;
            overflow: hidden;
        }
        .header .header-meta{
            flex: 3;
            max-width: 75%;
        } 
        .header .header-meta .player-title{
            text-transform: uppercase;
            fontweight: bold;
            font-size: 0.8em;
            margin-bottom: 5px;
        }
        .header .header-meta .song-title{
            font-size: 1.4em;
            white-space: nowrap; 
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: 5px;
        }
        .header .header-meta .album-title, .header .artist-title{
            font-size: 1em;
            white-space: nowrap; 
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: 5px;
        }
        .header .header-art{
            flex: 1;
        }
        .header .header-art .container{
            padding-top: 100%;
            position: relative;
            border: 1px solid #353535;
        }
        .header .header-art .container .inner{
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background-size: cover;
            background-repeat: no-repeat;
        }
        .playlist-trigger{
            position: absolute;
            left: 2px;
            right: 2px;
            top: 2px;
            bottom: 2px;
            border: 1px solid #353535;
            cursor: pointer;
            background-size: cover;
            background-repeat: no-repeat;
            overflow: hidden;
        }
        .playlist-name{
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            padding: 5px;
            max-height: 50%;
            background: rgb(0,0,0);
            background: -moz-linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 65%, rgba(0,0,0,1) 100%);
            background: -webkit-linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 65%, rgba(0,0,0,1) 100%);
            background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 65%, rgba(0,0,0,1) 100%);
            filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#000000",endColorstr="#000000",GradientType=1);
            white-space: nowrap; 
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 1em;
            color: #fff;
        }
        ul.tabs{
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            padding: 10px;
        }
        ul.tabs li{
            height: 30px;
            line-height: 30px;
            margin: 5px;
            border: 1px solid #353535;
            background-color: #1C1C1C;
            border-radius: 20px;
            cursor: pointer; 
            padding: 0 10px;
        }
        ul.tabs li:active{
            background-color: #373737;
        }
        ul.tabs li.active{
            background-color: #373737;
        }
        ul.tabs.block{
            border-bottom: 1px solid #353535;
            margin: 0;
            padding: 0; 
        }
        ul.tabs.block li{
            flex: 1;
            height: 40px;
            line-height: 40px;
            margin: 0px;
            border: none;
            border-right: 1px solid #353535;
            border-radius: 0px;
            font-size: 1.1em;
            margin: 0px;
            text-align: center;
        }
        ul.tabs.block li:last-child{
            border-right: none;
        }
        .loading-list{
            list-style: none;
            padding: 0;
            margin: 20px;
        }
    `;
    }
}
customElements.define("ha-spotify-sonos-card", HASpotifySonosCard);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "ha-spotify-sonos-card",
  name: "Spotify Sonos Card",
  preview: false,
  description: "List Spotify playlists, send to Sonos"
});
