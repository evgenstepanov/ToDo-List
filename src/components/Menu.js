import React from 'react';
import './Menu.css';
import { StoreContext } from '../store';

export default function Menu() {
  const {
    statusFilter: [statusFilter],
    priority: [priority],
    priorityIsOpen: [priorityIsOpen, setPriorityIsOpen],
    filterStatus,
  } = React.useContext(StoreContext);

  return (
    <div className='Menu'>
      <div className='status Menu__block-buttons'>
        {statusFilter.map(item => {
          return (
            <button
              key={item.name}
              className={`button status__button ${
                item.current ? 'button--current' : ''
              } text--medium-weight`}
              onClick={() => filterStatus(item.type)}
            >
              <div
                className={`status-icon status__icon icon--${item.type}`}
              ></div>
              {item.name}
            </button>
          );
        })}
      </div>
      <div className='priority'>
        <button
          className='main-btn Menu__main-btn button'
          onClick={() => setPriorityIsOpen(!priorityIsOpen)}
        >
          <div
            className={`main-btn__icon main-btn__icon--${
              priorityIsOpen ? 'opened' : 'closed'
            }`}
          ></div>
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
                className={`button priority__btn ${
                  item.current ? 'button--current' : ''
                } text--regular-weight`}
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
