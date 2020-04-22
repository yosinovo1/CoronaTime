from django.shortcuts import render

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from shop.models import Song
from shop.serializers import SongSerializer
from rest_framework.views import APIView
from rest_framework import generics


# I did not use generics here since there wasn't an appropriate generic class for my requirements
class SongList(APIView):
    """
    List all songs, or create a new songs/s.
    """
    def get(self, request, format=None):
        try:
            is_global = request.content_params["is_global"]
        except KeyError:
            # By default show global data
            is_global = True
        songs = Song.objects.all()
        serializer = SongSerializer(songs, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        data = request.data
        if isinstance(data, list):
            serializer = SongSerializer(data=request.data, many=True)
            print(data)
        else:
            serializer = SongSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, format=None):
        for put_request in request.data:
            try:
                song = Song.objects.get(id=put_request["id"])
            except Song.DoesNotExist:
                return Response(status.HTTP_404_NOT_FOUND) 
            serializer = SongSerializer(song, data=put_request)
            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            serializer.save()
        # using initial data since all data has been validated already
        return Response(SongSerializer(data=request.data, many=True).initial_data)

# If i will need to add content filters (whether the details are global or not)
# I'll override some functions with the is_global checking
class SongDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
    

class SongSubstringFilter(generics.ListAPIView):
    """
    List all songs that contain a substring in their track name.
    """

    def get(self, request, substring, format=None):
        try:
            is_global = request.content_params["is_global"]
        except KeyError:
            # By default show global data
            is_global = True
        songs = Song.objects.filter(track_name__icontains=substring)
        serializer = SongSerializer(songs, many=True)
        return Response(serializer.data)


class SongAlbumFilter(generics.ListAPIView):
    """
    List all songs in a specific album. 
    """

    def get(self, request, albumname, artistname, format=None):
        try:
            is_global = request.content_params["is_global"]
        except KeyError:
            # By default show global data
            is_global = True
        songs = Song.objects.filter(album_name=albumname).filter(artist_name=artistname)
        serializer = SongSerializer(songs, many=True)
        return Response(serializer.data)


class SongArtistFilter(generics.ListAPIView):
    """
    List all songs by a specific artist. 
    """

    def get(self, request, artistname, format=None):
        try:
            is_global = request.content_params["is_global"]
        except KeyError:
            # By default show global data
            is_global = True
        songs = Song.objects.filter(artist_name=artistname)
        serializer = SongSerializer(songs, many=True)
        return Response(serializer.data)


class AlbumDetail(generics.ListAPIView):
    """
    Retrieve an album.
    """

    def get(self, request, albumname, artistname, format=None):
        try:
            is_global = request.content_params["is_global"]
        except KeyError:
            # By default show global data
            is_global = True
        songs = Song.objects.filter(artist_name=artistname)
        serializer = SongSerializer(songs, many=True)
        return Response(serializer.data)

        songs = Song.objects.filter(album_name=albumname).filter(artist_name=artistname)
        serializer = SongSerializer(songs, many=True)
        try:
            album = {"album_name": f"{serializer.data[0]['album_name']}", "release_date": "Currently not available",
                "artist_name": f"{serializer.data[0]['artist_name']}", "genre": "Currently not available"}
        except IndexError:
            return Response(status.HTTP_404_NOT_FOUND) 
            
        return Response(album)


class AlbumSubstringFilter(generics.ListAPIView):
    """
    List all albums that contain a substring in their track name.
    """

    def get(self, request, substring, format=None):
        try:
            is_global = request.content_params["is_global"]
        except KeyError:
            # By default show global data
            is_global = True

        album_list = []
        songs = Song.objects.filter(album_name__icontains=substring)
        serializer = SongSerializer(songs, many=True)

        for song in serializer.data:
            album = {"album_name": f"{song['album_name']}", "release_date": "Currently not available",
                "artist_name": f"{song['artist_name']}", "genre": "Currently not available"}
            if album not in album_list:
                album_list.append(album)
        return Response(album_list)


class AlbumArtistFilter(generics.ListAPIView):
    """
    List all albums by a specific artist. 
    """

    def get(self, request, artistname, format=None):
        try:
            is_global = request.content_params["is_global"]
        except KeyError:
            # By default show global data
            is_global = True
        songs = Song.objects.filter(artist_name=artistname)
        serializer = SongSerializer(songs, many=True)
        song = serializer.data[0]
        album = {"album_name": f"{song['album_name']}", "release_date": "Currently not available",
                "artist_name": f"{song['artist_name']}", "genre": "Currently not available"}
        return Response(album)


class ArtistDetail(generics.ListAPIView):
    """
    Retrieve an artist.
    """

    def get(self, request, artistname, format=None):
        try:
            is_global = request.content_params["is_global"]
        except KeyError:
            # By default show global data
            is_global = True
        songs = Song.objects.filter(artist_name=artistname)
        serializer = SongSerializer(songs, many=True)
        try:
            artist = {"artist_name": f"{serializer.data[0]['artist_name']}"}   
        except IndexError:
            return Response(status.HTTP_404_NOT_FOUND)   
        return Response(artist)


class ArtistSubstringFilter(generics.ListAPIView):
    """
    List all artists that contain a substring in their name.
    """

    def get(self, request, substring, format=None):
        try:
            is_global = request.content_params["is_global"]
        except KeyError:
            # By default show global data
            is_global = True
            
        artist_list = []
        songs = Song.objects.filter(artist_name__icontains=substring)
        serializer = SongSerializer(songs, many=True)

        for song in serializer.data:
            artist = {"artist_name": f"{song['artist_name']}"}
            if artist not in artist_list:
                artist_list.append(artist)
        return Response(artist_list)

