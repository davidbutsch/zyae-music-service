import sys
import json
from ytmusicapi import YTMusic
ytmusic = YTMusic()


# song methods

def getSong(payload):
    result = ytmusic.get_song(videoId=payload['videoId'])
    return result

# TODO fix shuffle/radio
def getWatchlist(payload):
    result = ytmusic.get_watch_playlist(videoId=payload['videoId'], radio=True, limit=50)
    return result

def getLyrics(payload):
    result = ytmusic.get_lyrics(browseId=payload['browseId'])
    return result

def getSongRelated(payload):
    result = ytmusic.get_song_related(browseId=payload['browseId'])
    return result

while True:
    input = sys.stdin.readline()
    data = json.loads(input)

    result = {}

    result = locals()[data['action']](data['payload'])

    response = {}
    response['data'] = result

    print(json.dumps(response))
