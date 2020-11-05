import React from 'react';
import { StoreContext } from '../store';
import './TodoList.css';
import { Link } from 'react-router-dom';

export default function TodoList() {
  const {
    filteredTodos: [filteredTodos],
    toggleStatusTodo,
    getTime,
    getDate,
    getEditModal,
  } = React.useContext(StoreContext);

  return (
    <div className='todo-list text--medium-color'>
      <div className='todos-title-container text--medium-weight'>
        <div className='todos-title todos-title__name'>Наименование</div>
        <div className='todos-title todos-title__date'>Дедлайн</div>
        <div className='todos-title todos-title__priority'>Приоритет</div>
      </div>
      <ul className='todos-container'>
        {filteredTodos.map(todo => {
          return (
            <li key={todo.id} className='todo'>
              <div className='icons'>
                <div
                  className={`status-icon todo__icon icon--${todo.status}`}
                  onClick={() => toggleStatusTodo(todo.id)}
                ></div>
                <div
                  className='status-color todo__color'
                  style={{ backgroundColor: todo.color }}
                ></div>
              </div>
              <div className='todo__text'>
                <div className='todo-text__container'>
                  <Link
                    className='todo__name text--medium-weight text--medium-color'
                    to={`/${todo.slug}`}
                  >
                    {todo.name}
                  </Link>
                  <div className='todo__description text--size-small'>
                    {todo.description}
                  </div>
                </div>
              </div>
              <div className='todo__calendar'>
                <div className='todo__date text--regular-weight text--medium-color'>
                  {getDate(todo.date)}
                </div>
                <div className='todo__time text--size-small text--light-color'>
                  {getTime(todo.date)}
                </div>
              </div>
              <div className='todo__priority'>{todo.priorityText}</div>
              <div
                className='todo__edit'
                onClick={() => getEditModal(todo.id)}
              ></div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
