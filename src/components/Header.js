import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { StoreContext } from '../store';

export default function Header() {
  const {
    menuIsOpen: [menuIsOpen, setMenuIsOpen],
    openEmptyModal,
  } = React.useContext(StoreContext);

  return (
    <header className='Header'>
      <button
        className={`menu-button Header__menu-button menu-button_${
          menuIsOpen ? 'opened' : 'closed'
        }`}
        onClick={() => setMenuIsOpen(!menuIsOpen)}
      ></button>
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
