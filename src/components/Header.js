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
      Header__logo--outline-shadow 
      Header__logo--shadow
      text--extra-light-color
      text--black-weight
      text--size-huge'
        to='/'
      >
        To-Do List
      </Link>
      <button
        className='
      button button-plus 
      Header__button--outline-shadow 
      Header__button--shadow'
        onClick={openModalwithNew}
      ></button>
    </header>
  );
}
