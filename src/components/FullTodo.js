import React from 'react';
import { StoreContext } from '../store';
import './FullTodo.css';
import EditButton from './EditButton';
import { Link, useParams } from 'react-router-dom';

export default function FullTodo() {
  const { getTodo } = React.useContext(StoreContext);
  let { slug } = useParams();

  let todo = getTodo(slug);

  return (
    <div className='full-todo'>
      <div className='full-todo__header'>
        <Link className='full-todo__arrow-back' to='/'></Link>
        <div className='full-todo__title text--size-medium text--medium-weight'>
          {todo.name}
        </div>
        <EditButton
          id={todo.id}
          className={todo.status}
          title={todo.statusText}
          type='toggle'
        />
        <EditButton
          id={todo.id}
          className='delete'
          title='Удалить'
          type='delete'
        />
        <EditButton
          id={todo.id}
          className='edit'
          title='Редактировать'
          type='edit'
        />
      </div>
      <div className='todo-info-bar full-todo__todo-info-bar'>
        <div className='todo-info-block'>
          <div className='todo-info-block__title text--regular-weight text--size-small text--light-color'>
            Статус задачи
          </div>
          <div className='todo-info-block__data'>{todo.statusText}</div>
        </div>
        <div className='todo-info-block'>
          <div className='todo-info-block__title text--regular-weight text--size-small text--light-color'>
            Приоритет
          </div>
          <div className='todo-info-block__data'>{todo.priorityText}</div>
        </div>
        <div className='todo-info-block'>
          <div className='todo-info-block__title text--regular-weight text--size-small text--light-color'>
            Дедлайн
          </div>
          <div className='todo-info-block__data'>{todo.date}</div>
        </div>
        <div className='todo-info-block todo-info-block--last'>
          <div className='todo-info-block__title text--regular-weight text--size-small text--light-color'>
            Метка
          </div>
          <div
            className='todo-info-block__data todo-info-block__color'
            style={{ background: todo.color }}
          ></div>
        </div>
      </div>
      <div className='full-todo__description text--medium-color'>
        {todo.description}
      </div>
    </div>
  );
}
