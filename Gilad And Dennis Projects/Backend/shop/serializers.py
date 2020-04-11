from rest_framework import serializers
from shop.models import Song

class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ('id', 'added_at', 'added_by', 'track_duration', 'track_number', 'disc_number', \
            'album_name', 'artist_name', 'track_name', 'spotify_uri')

   
