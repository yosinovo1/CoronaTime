import React, { useEffect } from 'react';
import './Title.scss';
import Record from './vinyl-record.png';

function Title(displayName) {
  return (    
    <div className='category'>
      {displayName}
    </div>          
  );
}

export default Title;
