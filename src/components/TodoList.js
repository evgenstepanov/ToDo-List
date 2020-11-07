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
    openEditModal,
  } = React.useContext(StoreContext);

  return (
    <table className='table-todo text_medium-color'>
      <thead>
        <tr className='table-todo__header text_medium-weight'>
          <th className='table-todo__header-cell table-todo__header-cell_first text_medium-weight'>
            Название
          </th>
          <th className='table-todo__header-cell text_medium-weight'>
            Дедлайн
          </th>
          <th className='table-todo__header-cell text_medium-weight'>
            Приоритет
          </th>
        </tr>
      </thead>
      <tbody>
        {filteredTodos.map(todo => {
          return (
            <tr key={todo.id} className='todo'>
              <td className='todo__text todo-cell'>
                <div className='todo-icons'>
                  <div
                    className={`icon icon_${todo.status} todo-icons__icon-status`}
                    onClick={() => toggleStatusTodo(todo.id)}
                  ></div>
                  <div
                    className='icon-color'
                    style={{ backgroundColor: todo.color }}
                  ></div>
                </div>
                <Link
                  className='todo__name text_medium-weight text_medium-color'
                  to={`/${todo.slug}`}
                >
                  {todo.name}
                </Link>
                <div className='todo__description text_size-small'>
                  {todo.description}
                </div>
              </td>
              <td className='todo__calendar todo-cell'>
                <div className='todo__date text_regular-weight text_medium-color'>
                  {getDate(todo.date)}
                </div>
                <div className='todo__time text_size-small text_light-color'>
                  {getTime(todo.date)}
                </div>
              </td>
              <td className='todo__priority todo-cell'>
                {todo.priorityText}
                <div
                  className='todo__edit'
                  onClick={() => openEditModal(todo.id)}
                ></div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

// eslint-disable-next-line no-lone-blocks
{
  /*  */
}

// eslint-disable-next-line no-lone-blocks
{
  /*  */
}
