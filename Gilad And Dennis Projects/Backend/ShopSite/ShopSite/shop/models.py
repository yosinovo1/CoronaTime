from django.db import models

"""
CR:
Create 2 models instead - 'Track' & 'Album'.
Consider even adding an 'Artist' model.
"""


class Song(models.Model):
    # pub_date = models.DateTimeField('date published')
    added_at = models.DateTimeField('song added at')
    added_by = models.CharField(max_length=200)
    track_duration = models.IntegerField()
    track_number = models.IntegerField()
    disc_number = models.IntegerField()
    album_name = models.CharField(max_length=200)
    artist_name = models.CharField(max_length=200)
    track_name = models.CharField(max_length=200)
    spotify_uri = models.CharField(max_length=200)

    def __str__(self):
        return self.track_name
