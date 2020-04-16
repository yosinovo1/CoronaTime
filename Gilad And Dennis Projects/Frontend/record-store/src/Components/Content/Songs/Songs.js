import React from 'react';
import './Songs.scss';
import * as fetcher from '../../../Data/fetchData';

function Song({songName, artist}) {
  return <div className="song">{songName}</div>
}

function Songs() {
  const allSongs = fetcher.getSongs();
  return (
    <>
      {allSongs.map(song => <Song songName={song.name} artist={song.artist}/>)}
    </>
  );
}

export default Songs;
