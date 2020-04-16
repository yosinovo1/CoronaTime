"""ShopSite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from django.views.generic import TemplateView
from shop import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('songs/', views.song_list),
    path('songs/<int:pk>', views.song_detail),
    path('songs/by_substring/<str:substring>', views.song_substring_filter),
    path('songs/by_album/<str:albumname>/<str:artistname>', views.song_album_filter),
    path('songs/by_artist/<str:artistname>', views.song_artist_filter),
    path('albums/by_substring/<str:substring>', views.album_substring_filter),
    path('albums/by_artist/<str:artistname>', views.album_artist_filter),
    path('albums/<str:albumname>/<str:artistname>', views.album_detail),
    path('artists/<str:artistname>', views.artist_detail),
    path('artists/by_substring/<str:substring>', views.artist_substring_filter),
]

urlpatterns = format_suffix_patterns(urlpatterns)