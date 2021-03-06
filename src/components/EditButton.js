import React from 'react';

import './EditButton.css';
import { StoreContext } from '../store';

export default function EditButton({ id, type, title, className }) {
  const { toggleStatusTodo, openEditModal, deleteTodo } = React.useContext(
    StoreContext
  );

  let func;
  switch (type) {
    case 'toggle':
      func = toggleStatusTodo;
      break;
    case 'edit':
      func = openEditModal;
      break;
    case 'delete':
      func = deleteTodo;
      break;
    default:
      break;
  }

  return (
    <button
      className='button edit-button todo-header__edit-button'
      onClick={() => func(id)}
    >
      <div
        className={`edit-button__icon icon icon_${className}`}
      ></div>
      <div className='edit-button__text text_size-small'>{title}</div>
    </button>
  );
}
