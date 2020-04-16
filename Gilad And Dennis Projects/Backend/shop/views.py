from django.shortcuts import render

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from shop.models import Song
from shop.serializers import SongSerializer


@api_view(['GET', 'PUT', 'POST'])
def song_list(request, format=None):
    """
    List all songs, or create a new song/s.
    """
    try:
        is_global = request.content_params["is_global"]
    except KeyError:
        # By default show global data
        is_global = True

    if request.method == 'GET':
        songs = Song.objects.all()
        serializer = SongSerializer(songs, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
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


    elif request.method == 'PUT':
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

@api_view(['GET', 'PUT', 'DELETE'])
def song_detail(request, pk, format=None):
    """
    Retrieve, update or delete a song.
    """

    try:
        is_global = request.content_params["is_global"]
    except KeyError:
        # By default show global data
        is_global = True

    try:
        song = Song.objects.get(pk=pk)
    except Song.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = SongSerializer(song)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = SongSerializer(song, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        song.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def song_substring_filter(request, substring, format=None):
    """
    List all songs that contain a substring in their track name.
    """

    try:
        is_global = request.content_params["is_global"]
    except KeyError:
        # By default show global data
        is_global = True

    if request.method == 'GET':
        songs = Song.objects.filter(track_name__icontains=substring)
        serializer = SongSerializer(songs, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def song_album_filter(request, albumname, artistname, format=None):
    """
    List all songs in a specific album. 
    """

    try:
        is_global = request.content_params["is_global"]
    except KeyError:
        # By default show global data
        is_global = True

    if request.method == 'GET':
        songs = Song.objects.filter(album_name=albumname).filter(artist_name=artistname)
        serializer = SongSerializer(songs, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def song_artist_filter(request, artistname, format=None):
    """
    List all songs by a specific artist. 
    """

    try:
        is_global = request.content_params["is_global"]
    except KeyError:
        # By default show global data
        is_global = True

    if request.method == 'GET':
        songs = Song.objects.filter(artist_name=artistname)
        serializer = SongSerializer(songs, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def album_detail(request, albumname, artistname, format=None):
    """
    Retrieve an album.
    """

    try:
        is_global = request.content_params["is_global"]
    except KeyError:
        # By default show global data
        is_global = True

    songs = Song.objects.filter(album_name=albumname).filter(artist_name=artistname)
    serializer = SongSerializer(songs, many=True)
    try:
        album = {"album_name": f"{serializer.data[0]['album_name']}", "release_date": "Currently not available",
            "artist_name": f"{serializer.data[0]['artist_name']}", "genre": "Currently not available"}
    except IndexError:
        return Response(status.HTTP_404_NOT_FOUND) 
            
    if request.method == 'GET':
        return Response(album)

@api_view(['GET'])
def album_substring_filter(request, substring, format=None):
    """
    List all albums that contain a substring in their track name.
    """

    try:
        is_global = request.content_params["is_global"]
    except KeyError:
        # By default show global data
        is_global = True

    if request.method == 'GET':
        album_list = []
        songs = Song.objects.filter(album_name__icontains=substring)
        serializer = SongSerializer(songs, many=True)

        for song in serializer.data:
            album = {"album_name": f"{song['album_name']}", "release_date": "Currently not available",
                "artist_name": f"{song['artist_name']}", "genre": "Currently not available"}
            if album not in album_list:
                album_list.append(album)
        return Response(album_list)

@api_view(['GET'])
def album_artist_filter(request, artistname, format=None):
    """
    List all albums by a specific artist. 
    """

    try:
        is_global = request.content_params["is_global"]
    except KeyError:
        # By default show global data
        is_global = True

    if request.method == 'GET':
        songs = Song.objects.filter(artist_name=artistname)
        serializer = SongSerializer(songs, many=True)
        song = serializer.data[0]
        album = {"album_name": f"{song['album_name']}", "release_date": "Currently not available",
                "artist_name": f"{song['artist_name']}", "genre": "Currently not available"}
        return Response(album)

@api_view(['GET'])
def artist_detail(request, artistname, format=None):
    """
    Retrieve an artist.
    """

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
    if request.method == 'GET':
        return Response(artist)

@api_view(['GET'])
def artist_substring_filter(request, substring, format=None):
    """
    List all artists that contain a substring in their name.
    """

    try:
        is_global = request.content_params["is_global"]
    except KeyError:
        # By default show global data
        is_global = True
    
    if request.method == 'GET':
        artist_list = []
        songs = Song.objects.filter(artist_name__icontains=substring)
        serializer = SongSerializer(songs, many=True)

        for song in serializer.data:
            artist = {"artist_name": f"{song['artist_name']}"}
            if artist not in artist_list:
                artist_list.append(artist)
        return Response(artist_list)

