import React from 'react';
import './Menu.css';
import { StoreContext } from '../store';

export default function Menu() {
  const {
    menu: [menu],
    priority: [priority],
    priorityIsOpen: [priorityIsOpen],
  } = React.useContext(StoreContext);

  return (
    <div className='Menu'>
      <div className='status Menu__block-buttons'>
        {menu.map(item => {
          return (
            <button
              key={item.name}
              className={`button status__button ${
                item.current ? 'button--current' : ''
              }`}
            >
              <div
                className={`status-icon status__icon status__icon--${item.className}`}
              ></div>
              {item.name}
            </button>
          );
        })}
      </div>
      <div className='priority'>
        <button className='main-btn Menu__main-btn button'>
          <div className='main-btn__icon main-btn__icon--closed'></div>
          Приоритет
        </button>
        <div
          className={`priority-container ${
            priorityIsOpen ? 'priority-container--opened' : ''
          }`}
        >
          {priority.map(item => {
            return (
              <button
                key={item.name}
                className={`button priority__btn  ${
                  item.current ? 'button--current' : ''
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
