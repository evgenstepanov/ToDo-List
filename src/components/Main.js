import React from 'react';
import './Main.css';
import { StoreContext } from '../store';

export default function Main() {
  const {
    todos: [todos],
  } = React.useContext(StoreContext);

  console.log(todos);
  return (
    <div className='Main'>
      <div className='todo-list'>
        <div className='todos-title'>
          <div className='todos-title__name'>Наименование</div>
          <div className='todos-title__date'>Дедлайн</div>
          <div className='todos-title__priority'>Приоритет</div>
        </div>
        <ul className='todos-container'>
          {todos.map(todo => {
            return (
              <li key={todo.id} className='todo'>
                <div className='icons'>
                  <div
                    className={`status-icon todo__icon status__icon--${todo.status}`}
                  ></div>
                  <div
                    className='status-color todo__color'
                    style={{ backgroundColor: todo.color }}
                  ></div>
                </div>
                <div className='todo__text'>
                  <div className='todo__title'>{todo.name}</div>
                  <div>
                    <div className='todo__description'>{todo.description}</div>
                  </div>
                </div>
                <div className='todo__calendar'>
                  <div className='todo__date'>
                    {todo.date.toLocaleDateString()}
                  </div>
                  <div className='todo__time'>
                    {todo.date.getHours() + ':' + todo.date.getMinutes()}
                  </div>
                </div>
                <div className='todo__priority'>{todo.priorityText}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
