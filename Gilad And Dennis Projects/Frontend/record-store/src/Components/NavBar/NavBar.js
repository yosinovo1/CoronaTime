import React from 'react';
import './NavBar.scss';
import {categories} from '../../configuration.js';
import {useSelector, useDispatch} from 'react-redux';
import {selectCategory} from '../../Actions';

function Category(props) {
  const selectedCategory = useSelector(state => state.selectedCategory);
  const dispatch = useDispatch();
  const isSelected = selectedCategory === props.category;

  return (
    <div     
    onClick={() => dispatch(selectCategory(props.category))}
    className={'category ' + (isSelected ? 'selected' : 'not-selected')}>
      {props.category}
    </div>
  );  
}

function NavBar() {
  return (
    <div className='nav-bar'>
      {Object.values(categories).map(category => (        
        <Category key={category} category={category}/>
      ))}
    </div>
  );
}

export default NavBar;
