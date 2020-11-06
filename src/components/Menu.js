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
              className={`button status-button ${
                item.current ? 'button_current ' : ''
              }text_medium-weight`}
              onClick={() => filterStatus(item.type)}
            >
              <div
                className={`icon-status status-button__icon-status icon-status_${item.type}`}
              ></div>
              {item.name}
            </button>
          );
        })}
      </div>
      <div className='priority'>
        <button
          className='button priority-main-button Menu__priority-main-button '
          onClick={() => setPriorityIsOpen(!priorityIsOpen)}
        >
          <div
            className={`main-btn__icon main-btn__icon_${
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
          {priority.map(item => {
            return (
              <button
                key={item.name}
                className={`button priority-button ${
                  item.current ? ' button_current' : ''
                }text_regular-weight`}
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
