# Home Assistant Spotify Sonos Card

## What's The Problem?

How can I fetch my Spotify media and send it to my Sonos speakers?

---

This custom Home Assistant Lovelace card is designed to bring playlists, albums, and recently played media from a Spotify account, and play the media on a Sonos device. 

The ideal use case is on a room dashboard for a particular room, as the card is instansiated with a default player.


> **WARNING**
>
> I am not a regular Home Assistant developer, I have tried to observe what I can of best practise and methodology, but I cannot claim that things have been done to any specified standard. This project solves a problem for me personally, it would be awesome if it can solve a problem for you too. 

## Screenshots
![demo ha spotify sonos](https://github.com/domoconnell/ha-spotify-sonos-card/blob/master/images/ha-spotify-sonos.png?raw=true)


## Features

- Fetch and list albums, recently played, and playlists from designated Spotify accounts
- Send media directly to Sonos (uses the `media_player` play action)
- Set custom speaker configurations, including volume levels and default media

## Requirements
1. Home Assistant 
2. HA Spotify integration
3. HA Sonos integration
4. Spotify Premium
5. At least one Sonos media player
6. HACS

You must already have Spotify fully configured in Home Assistant, which is a bit of a faff because it requires developer dashboards and Spotify applications. 



## Installation

1. Download the `index.js` file from the `/dist` directory, or from the latest release
2. Use an FTP client, or alternative method, to upload the file to HA to: `/config/www/ha-spotify-sonos-card.js`
3. Go to `Configuration > Lovelace Dashboards > Resources`
4. Add Resource `/hacsfiles/spotify-card/spotify-card.js` as type `JavaScipt Module`
5. Clear browser cache 
6. Add new card to dashboard, it shows up as `Custom: Spotify Sonos Card`

A bit more information of using custom cards can be found here: 

https://developers.home-assistant.io/docs/frontend/custom-ui/lovelace-custom-card/#referencing-your-new-card

##  Configuration

```yaml
type: custom:ha-spotify-sonos-card
entity_id: media_player.sonosbedroom1
show_header: false
show_linked_players: false
grid_limit: 12
spotify_accounts:
  - id: media_player.spotify_account_1
    name: Account 1
  - id: media_player.spotify_account_2
    name: Account 2
groups:
  - name: Party
    volume: 0.2
    players:
      - entity_id: media_player.sonoshall
        volume: 0.2
      - entity_id: media_player.sonosdining
        volume: 0.2
      - entity_id: media_player.sonoskitchen
        volume: 0.2
      - entity_id: media_player.sonoslounge
        volume: 0.4
  - name: Dinner
    volume: 0.05
    media: spotify:playlist:37i9dQZF1DX4xuWVBs4FgJ
    players:
      - entity_id: media_player.sonosdining
        volume: 0.1
      - entity_id: media_player.sonoskitchen
        volume: 0.1
  - name: Solo
    volume: 0.02
    players: null
```

## Explanation of the config
| Variable | Description | Example |
|---------|-------|---|
|type|custom lovelace card | custom:ha-spotify-sonos-card
|entity_id|the main Sonos device to control | media_player.sonosbedroom1| 
|show_header| shows the media meta at the top of the card | false|
|show_linked_players| shows the players that are joined to the main player | false|
|grid_limit | how many media squares to display | 12| 
|Spotifiy accounts| home assistant entity_ids of the spotify accounts | each requires id, and name - which is a label|
|groups| predefined configurations for the main player, joined devices and volumes | | 


