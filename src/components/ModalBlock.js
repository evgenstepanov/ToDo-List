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

  const handleCancelButton = e => {
    e.preventDefault();
    setModalIsOpen(false);
    setEditMode(false);
  };

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
          <h1 className='modal-title modal-form__modal-title modal-form__item text_dark-color text_size-big text_regular-weight'>
            {editMode ? 'Редактирование задачи' : 'Создание задачи'}
          </h1>
          <button
            className='button modal-form__button_cancel'
            onClick={handleCancelButton}
          ></button>
          <label className='modal-label modal-form__item modal-form__name'>
            <div className='modal-label__text text_size-small'>Название</div>
            <input
              className={`input text_size-regular${
                nameIsValid ? '' : ' warning'
              }`}
              type='text'
              maxLength='40'
              name='name'
              value={todoInEdit.name}
              onChange={handleInput}
            ></input>
            {nameIsValid ? null : (
              <p className='modal-form__warning text_size-small'>
                Вы не указали название
              </p>
            )}
          </label>
          <label className='modal-label modal-form__item modal-form__date text_size-small'>
            <div className='modal-label__text text_size-small'>Дедлайн</div>
            <input
              className='input modal-label__input_img-calendar text_size-regular'
              type='text'
              name='date'
              placeholder='ДД.ММ.ГГГГ, ММ:ЧЧ'
              value={todoInEdit.date}
              onChange={handleInput}
            ></input>
          </label>
          <label className='modal-label modal-form__item modal-form__priority text_size-small'>
            <div className='modal-label__text text_size-small'>Приоритет</div>
            <select
              className='input modal-label__input_img-arrow-down modal-label__input_arrow-disable text_size-regular'
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
          <label className='modal-label modal-form__item modal-form__color text_size-small'>
            <div className='modal-label__text text_size-small'>Метка</div>
            <div
              className='input-icon input-icon_color'
              style={{ background: todoInEdit.color }}
            ></div>
            <input
              className='input modal-form__input-color text_size-regular'
              type='text'
              name='color'
              value={todoInEdit.color}
              onChange={handleInput}
            ></input>
          </label>
          <label className='modal-label modal-label_last modal-form__item modal-form__description text_size-small'>
            <div className='modal-label__text text_size-small'>Описание</div>
            <textarea
              className='input modal-form__input-description text_size-regular'
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
                className='button icon_delete block-buttons__button_delete'
                onClick={() => deleteTodo(todoInEdit.id)}
              ></button>
            ) : null}
            <button
              className='button modal-btn block-buttons__button_cancel'
              onClick={handleCancelButton}
            >
              Отменить
            </button>
            <button
              className='button modal-btn block-buttons__button_save'
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
