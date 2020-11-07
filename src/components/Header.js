import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { StoreContext } from '../store';

export default function Header() {
  const { openEmptyModal } = React.useContext(StoreContext);

  return (
    <header className='Header'>
      <button className='button'></button>
      <Link
        className='logo Header__logo text_size-huge text_black-weight text_extra-light-color'
        to='/'
      >
        To-Do List
      </Link>
      <button
        className='
      button button-plus 
      Header__button_outline-shadow 
      Header__button_shadow'
        onClick={openEmptyModal}
      ></button>
    </header>
  );
}
