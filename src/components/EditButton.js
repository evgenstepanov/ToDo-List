import React from 'react';

import './EditButton.css';
import { StoreContext } from '../store';

export default function EditButton({ id, type, title, className }) {
  const { toggleStatusTodo, getEditModal, deleteTodo } = React.useContext(
    StoreContext
  );

  let func;
  switch (type) {
    case 'toggle':
      func = toggleStatusTodo;
      break;
    case 'edit':
      func = getEditModal;
      break;
    case 'delete':
      func = deleteTodo;
      break;
    default:
      break;
  }

  return (
    <button className='button edit-button' onClick={() => func(id)}>
      <div className={`edit-button__icon status-icon icon--${className}`}></div>
      <div className='edit-button__title text--size-small'>{title}</div>
    </button>
  );
}
