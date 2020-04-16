import React from 'react';
import './Content.scss';
import {useSelector} from 'react-redux';
import {categories} from '../../configuration';
import Album from './Album/Album';
import Albums from './Albums/Albums';
import Song from './Song/Song';
import Songs from './Songs/Songs';
import Artist from './Artist/Artist';
import Artists from './Artists/Artists';

function ComponentbyId() {
  const contentIdStack = useSelector(state => state.contentIdStack);  
  const currentContentId = contentIdStack[contentIdStack.length - 1];
  const category = currentContentId.category;
  const value = currentContentId.value;
  
  const rules = [
    [() => category===categories.SONGS && !value, <Songs/>],
    [() => category===categories.SONGS && value, <Song/>],
    [() => category===categories.ALBUMS && !value, <Albums/>],
    [() => category===categories.ALBUMS && value, <Album/>],
    [() => category===categories.ARTISTS && !value, <Artists/>],
    [() => category===categories.ALBUMS && value, <Artist/>]
  ]

  for (const rule of rules) {
    if (rule[0]()) {
      return rule[1]
    }
  }

  return <div>Something went wrong :(</div>
}

function Content() {
  return <div className="content-container"><ComponentbyId/></div>;
}

export default Content;
