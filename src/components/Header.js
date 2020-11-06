import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { StoreContext } from '../store';

export default function Header() {
  const { openModalwithNew } = React.useContext(StoreContext);

  return (
    <header className='Header'>
      <Link
        className='
      Header__logo 
      Header__logo_outline-shadow 
      Header__logo_shadow
      text_extra-light-color
      text_black-weight
      text_size-huge'
        to='/'
      >
        To-Do List
      </Link>
      <button
        className='
      button button-plus 
      Header__button_outline-shadow 
      Header__button_shadow'
        onClick={openModalwithNew}
      ></button>
    </header>
  );
}
