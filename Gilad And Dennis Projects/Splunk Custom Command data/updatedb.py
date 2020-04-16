import sys
import requests
import logging
from splunklib.searchcommands import dispatch, StreamingCommand, Configuration, Option, validators


@Configuration()
class UpdatedbCommand(StreamingCommand):
    """
    This custom streaming command implements access to
    a database via django rest api provided by the server
    """
    update_type = Option(require=True)

    def stream(self, events):
        request_url = "http://192.168.1.21:2222/songs/"
        for event in events:
            post_json_format = {"added_at": f"{event['Added At']}", "added_by": f"{event['Added By']}", 
            "track_duration": event['Track Duration _ms'], "track_number": event['Track Number'], "disc_number": event['Disc Number'], 
            "album_name": f"{event['Album Name']}", "artist_name": f"{event['Artist Name']}", 
            "track_name": f"{event['Track Name']}", "spotify_uri": f"{event['Spotify URI']}"}
            if self.update_type == "add":
                requests.post(request_url, json=post_json_format)
            # delete command works like so: filtering the events as needed, and the final events
            # will be addressed as "songs to be deleted from the database" (each event
            # represents a song in the database)
            elif self.update_type == "delete":
                songs_list = requests.get(request_url).json()
                for song in songs_list:
                    self.are_same(song, event):
                        requests.delete(f"{request_url}{song["id"]}")
            # update command works simillar to delete command in terms of event filtering
            elif self.update_type == "update":
                songs_list = requests.get(request_url).json()
                for song in songs_list:
                    self.are_same(song, event):
                        requests.put(f"{request_url}{song["id"]}", json=post_json_format)
                requests.put(url, json=json_format)
                
            yield event

    def are_same(song, event):
        # Unique parameters to identify a song
        return (song['added_at'] == event['Added At'] and song['added_by'] == event['Added By']
                and song['spotify_uri'] == event['Spotify URI'])



if __name__ == "__main__":
    dispatch(UpdatedbCommand, sys.argv, sys.stdin, sys.stdout, __name__)
