import React from 'react';
import './Header.css';

export default function Header() {
  return (
    <header className='Header'>
      <div
        className='
      Header__logo 
      Header__logo--outline-shadow 
      Header__logo--shadow'
      >
        To-Do List
      </div>
      <button
        className='
      button button-plus 
      Header__button--outline-shadow 
      Header__button--shadow'
      ></button>
    </header>
  );
}
