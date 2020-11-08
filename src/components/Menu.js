import React from 'react';
import './Menu.css';
import { StoreContext } from '../store';

export default function Menu() {
  const {
    statusFilter: [statusFilter],
    priorityFilter: [priorityFilter],
    priorityIsOpen: [priorityIsOpen, setPriorityIsOpen],
    menuIsOpen: [menuIsOpen],
    setFilterStatus,
    setFilterPriority,
  } = React.useContext(StoreContext);

  return (
    <div className={`Menu Menu_${menuIsOpen ? 'opened' : 'closed'}`}>
      <div className='status Menu__block-buttons'>
        {statusFilter.map(item => {
          return (
            <button
              key={item.name}
              className={`button status-button ${
                item.current ? 'button_current ' : ''
              }text_medium-weight`}
              onClick={() => setFilterStatus(item.type)}
            >
              <div
                className={`icon status-button__icon-status icon_${item.type}`}
              ></div>
              {item.name}
            </button>
          );
        })}
      </div>
      <div className='priority'>
        <button
          className='button priority-main-button text_medium-weight Menu__priority-main-button '
          onClick={() => setPriorityIsOpen(!priorityIsOpen)}
        >
          <div
            className={`priority-main-btn__icon priority-main-btn__icon_${
              priorityIsOpen ? 'opened' : 'closed'
            }`}
          ></div>
          Приоритет
        </button>
        <div
          className={`priority-container ${
            priorityIsOpen ? 'priority-container_opened' : ''
          }`}
        >
          {priorityFilter.map(item => {
            return (
              <button
                key={item.name}
                className={`button priority-button text_regular-weight ${
                  item.current ? ' button_current' : ''
                }`}
                onClick={() => setFilterPriority(item.type)}
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
