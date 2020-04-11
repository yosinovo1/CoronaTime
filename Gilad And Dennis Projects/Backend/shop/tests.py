import json
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from shop.models import Song
from shop.serializers import SongSerializer

class AddSongsTestCase(APITestCase):

    def test_add_song(self):
        data = {"added_at": "2020-01-01T13:33:00+03:00", "added_by": "Dennis Floyd", 
            "track_duration": 4123, "track_number": 7, "disc_number": 7, 
            "album_name": "Oasis", "artist_name": "Dennis Floyd", 
            "track_name": "Nevermind I Forgot", "spotify_uri": "www.spotifyexample3.com"}
        response = self.client.post("/songs/", data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Song.objects.count(), 1)
        self.assertEqual(Song.objects.get().track_name, 'Nevermind I Forgot')

    def test_add_songs(self):
        first_song = {"added_at": "2020-01-01T13:33:00+03:00", "added_by": "Dennis Floyd", 
            "track_duration": 1337, "track_number": 7, "disc_number": 7, 
            "album_name": "Oasis", "artist_name": "Dennis Mloyd", 
            "track_name": "Nevermind I Forgot", "spotify_uri": "www.spotifyexample4.com"}
        second_song = {"added_at": "2020-01-01T13:33:00+03:00", "added_by": "Dennis Floyd", 
            "track_duration": 1000, "track_number": 7, "disc_number": 7, 
            "album_name": "Oasis", "artist_name": "Dennis Floyd", 
            "track_name": "Nevermind I Forgot", "spotify_uri": "www.spotifyexample5.com"}
        data = [first_song, second_song]
        response = self.client.post("/songs/", data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Song.objects.count(), 2)
        self.assertEqual(Song.objects.get(spotify_uri="www.spotifyexample4.com").track_duration, 1337)
        self.assertEqual(Song.objects.get(spotify_uri="www.spotifyexample5.com").track_duration, 1000)

class UpdateSongsTestCase(APITestCase):

    def setUp(self):
        first_song = {"added_at": "2020-01-01T13:33:00+03:00", "added_by": "Dennis Floyd", 
            "track_duration": 1337, "track_number": 7, "disc_number": 7, 
            "album_name": "Oasis", "artist_name": "Dennis Mloyd", 
            "track_name": "Nevermind I Forgot", "spotify_uri": "www.spotifyexample4.com"}
        second_song = {"added_at": "2020-01-01T13:33:00+03:00", "added_by": "Dennis Floyd", 
            "track_duration": 1000, "track_number": 7, "disc_number": 7, 
            "album_name": "Oasis", "artist_name": "Dennis Floyd", 
            "track_name": "Nevermind I Forgot", "spotify_uri": "www.spotifyexample5.com"}
        data = [first_song, second_song]
        self.client.post("/songs/", data, format='json')

    def test_update_song(self):
        # let's say i want to update "added_by" field
        # testing that there is a row (representing the first song) in the table that was created in the setUp function
        self.assertEqual(Song.objects.get(spotify_uri="www.spotifyexample4.com").added_by, "Dennis Floyd")
        song_id = Song.objects.get(spotify_uri="www.spotifyexample4.com").id
        updated_first_song = {"added_at": "2020-01-01T13:33:00+03:00", "added_by": "D-nice", 
            "track_duration": 1337, "track_number": 7, "disc_number": 7, 
            "album_name": "Oasis", "artist_name": "Dennis Mloyd", 
            "track_name": "Nevermind I Forgot", "spotify_uri": "www.spotifyexample4.com"}

        # updating the row with the new data, accessing it via the id 
        response = self.client.put(f"/songs/{song_id}", updated_first_song, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # making sure that there are still 2 objects like there was in the beginning, because our goal was to only update, not delete or add
        self.assertEqual(Song.objects.count(), 2)
        # making sure that only specific data was changed, track duration didn't change
        self.assertEqual(Song.objects.get(spotify_uri="www.spotifyexample4.com").track_duration, 1337)
        # added_by has been changed, as needed
        self.assertEqual(Song.objects.get(spotify_uri="www.spotifyexample4.com").added_by, "D-nice")
        # other records has not been changed, as needed
        self.assertEqual(Song.objects.get(spotify_uri="www.spotifyexample5.com").added_by, "Dennis Floyd")

    def test_update_songs(self):
        # let's say i want to update "album_name" field, and i want to do that in one "PUT" request
        # testing that there are 2 rows (representing the first and second song) in the table that was created in the setUp function
        self.assertEqual(Song.objects.get(spotify_uri="www.spotifyexample4.com").added_by, "Dennis Floyd")
        self.assertEqual(Song.objects.get(spotify_uri="www.spotifyexample5.com").added_by, "Dennis Floyd")
        first_song_id = Song.objects.get(spotify_uri="www.spotifyexample4.com").id
        second_song_id = Song.objects.get(spotify_uri="www.spotifyexample5.com").id
        updated_first_song = {"id": first_song_id, "added_at": "2020-01-01T13:33:00+03:00", "added_by": "D-nice", 
            "track_duration": 1337, "track_number": 7, "disc_number": 7, 
            "album_name": "Sanctuary", "artist_name": "Dennis Mloyd", 
            "track_name": "Nevermind I Forgot", "spotify_uri": "www.spotifyexample4.com"}
        updated_second_song = {"id": second_song_id, "added_at": "2020-01-01T13:33:00+03:00", "added_by": "D-nice", 
            "track_duration": 1337, "track_number": 7, "disc_number": 7, 
            "album_name": "Sanctuary", "artist_name": "Dennis Mloyd", 
            "track_name": "Nevermind I Forgot", "spotify_uri": "www.spotifyexample5.com"}

        data = [updated_first_song, updated_second_song]
        response = self.client.put("/songs/", data, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # making sure that there are still 2 objects like there was in the beginning, because our goal was to only update, not delete or add
        self.assertEqual(Song.objects.count(), 2)
        # making sure that only specific data was changed, track duration didn't change
        self.assertEqual(Song.objects.get(spotify_uri="www.spotifyexample4.com").track_duration, 1337)
        self.assertEqual(Song.objects.get(spotify_uri="www.spotifyexample5.com").track_duration, 1337)
        # album_name has been changed, in the first record, as needed
        self.assertEqual(Song.objects.get(spotify_uri="www.spotifyexample4.com").album_name, "Sanctuary")
        # album_name has been changed, in the second record, as needed
        self.assertEqual(Song.objects.get(spotify_uri="www.spotifyexample4.com").album_name, "Sanctuary")

class DeleteSongTestCase(APITestCase):

    def setUp(self):
        data = {"added_at": "2020-01-01T13:33:00+03:00", "added_by": "Dennis Floyd", 
            "track_duration": 1337, "track_number": 7, "disc_number": 7, 
            "album_name": "Oasis", "artist_name": "Dennis Mloyd", 
            "track_name": "Nevermind I Forgot", "spotify_uri": "www.spotifyexample6.com"}
        self.client.post("/songs/", data, format='json')

    def test_delete_song(self):
        # making sure that the record has been created in setUp function
        self.assertEqual(Song.objects.get(spotify_uri="www.spotifyexample6.com").added_by, "Dennis Floyd")
        song_id = Song.objects.get(spotify_uri="www.spotifyexample6.com").id
        self.client.delete(f"/songs/{song_id}")
        # making sure that there isn't a record anymore
        self.assertEqual(Song.objects.count(), 0)



