import React from 'react';
import './ModalBlock.css';
import { StoreContext } from '../store';

export default function ModalBlock() {
  const {
    todoInEdit: [todoInEdit],
    modalIsOpen: [modalIsOpen, setModalIsOpen],
    editMode: [editMode, setEditMode],
    saveTodo,
    handleInput,
    createNewOne,
    nameIsValid,
    deleteTodo,
  } = React.useContext(StoreContext);

  let func = editMode
    ? e => {
        e.preventDefault();
        saveTodo(todoInEdit.id);
      }
    : createNewOne;

  if (modalIsOpen)
    return (
      <div className='ModalBlock'>
        <form className='modal-form'>
          <h1 className='modal-form__title text--dark-color text--size-big text--regular-weight'>
            {editMode ? 'Редактирование задачи' : 'Создание задачи'}
          </h1>
          <label className='label modal-form__name'>
            <div className='label__text text--size-small'>Название</div>
            <input
              className={`input modal-form__input-name text--size-regular${
                nameIsValid ? '' : ' warning'
              }`}
              type='text'
              maxLength='40'
              name='name'
              value={todoInEdit.name}
              onChange={handleInput}
            ></input>
            {nameIsValid ? null : (
              <p className='modal-form__warning text--size-small'>
                Вы не указали название
              </p>
            )}
          </label>
          <label className='label modal-form__date text--size-small'>
            <div className='label__text text--size-small'>Дедлайн</div>
            <div className='input-icon input-icon--calendar'></div>
            <input
              className='input modal-form__input-date text--size-regular'
              type='text'
              name='date'
              placeholder='ДД.ММ.ГГГГ, ММ:ЧЧ'
              value={todoInEdit.date}
              onChange={handleInput}
            ></input>
          </label>
          <label className='label modal-form__priority text--size-small'>
            <div className='label__text text--size-small'>Приоритет</div>
            <div className='input-icon input-icon--arrow'></div>
            <select
              className='input modal-form__input-priority text--size-regular'
              type='text'
              name='priority'
              value={todoInEdit.priority}
              onChange={handleInput}
            >
              <option value='high'>Высокий</option>
              <option value='medium'>Средний</option>
              <option value='low'>Низкий</option>
            </select>
          </label>
          <label className='label modal-form__color text--size-small'>
            <div className='label__text text--size-small'>Метка</div>
            <div
              className='input-icon input-icon--color'
              style={{ background: todoInEdit.color }}
            ></div>
            <input
              className='input modal-form__input-color text--size-regular'
              type='text'
              name='color'
              value={todoInEdit.color}
              onChange={handleInput}
            ></input>
          </label>
          <label className='label modal-form__description text--size-small'>
            <div className='label__text text--size-small'>Описание</div>
            <textarea
              className='input modal-form__input-description text--size-regular'
              type='text'
              rows='5'
              name='description'
              value={todoInEdit.description}
              onChange={handleInput}
            ></textarea>
          </label>
          <div className='block-buttons modal-form__block-buttons'>
            {editMode ? (
              <button
                className='button block-buttons__button--delete'
                onClick={() => deleteTodo(todoInEdit.id)}
              ></button>
            ) : null}
            <button
              className='button modal-btn block-buttons__button--cancel'
              onClick={e => {
                e.preventDefault();
                setModalIsOpen(false);
                setEditMode(false);
              }}
            >
              Отменить
            </button>
            <button
              className='button modal-btn block-buttons__button--save'
              autoFocus
              onClick={func}
            >
              {editMode ? 'Сохранить' : 'Создать'}
            </button>
          </div>
        </form>
      </div>
    );
  return null;
}
