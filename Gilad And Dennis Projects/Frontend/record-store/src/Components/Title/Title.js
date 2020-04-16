import React from 'react';
import './Title.scss';

function Title() {
  return (
    <div className='title-container'>
      <div className='title'>
        Record Store
      </div>
      <img src={require('./vinyl-record.png')} alt='record icon'/>      
    </div>
  );
}

export default Title;
