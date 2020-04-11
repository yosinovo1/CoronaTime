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
            json_format = {"added_at": f"{event['Added At']}", "added_by": f"{event['Added By']}", 
            "track_duration": event['Track Duration _ms'], "track_number": event['Track Number'], "disc_number": event['Disc Number'], 
            "album_name": f"{event['Album Name']}", "artist_name": f"{event['Artist Name']}", 
            "track_name": f"{event['Track Name']}", "spotify_uri": f"{event['Spotify URI']}"}
            #if self.update_type == "add":
            requests.post(request_url, json=json_format)    
            #elif self.update_type == "update":
            #    requests.put(url, json=json_format)
            yield event

if __name__ == "__main__":
    dispatch(UpdatedbCommand, sys.argv, sys.stdin, sys.stdout, __name__)
