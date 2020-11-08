import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { transliterate as slugify } from 'transliteration';

export const StoreContext = React.createContext();
export default function ToDoProvider({ children }) {
  const [todos, setTodo] = useState([
    {
      id: 1,
      name: 'Приготовить лазанью',
      slug: 'prigotovit-lazanu',
      status: 'done',
      statusText: 'Выполнена',
      priority: 'high',
      priorityText: 'Высокий',
      color: '#F2C94C',
      date: '12.12.2020, 20:30',
      description:
        'Собраться с мыслями, составить список продуктов, одеться, отчаяться, установить яндекс еду',
    },
    {
      id: 2,
      name: 'Помыть машину',
      slug: 'pomit-mashinu',
      status: 'done',
      statusText: 'Выполнена',
      priority: 'medium',
      priorityText: 'Средний',
      color: '#EB0000',
      date: '30.11.2020, 23:00',
      description:
        'Нагуглить ближайшую мойку, позвонить, записаться, помыться, ждать дождя',
    },
    {
      id: 3,
      name: 'Купить собаку',
      slug: 'kupit-sobaku',
      status: 'done',
      statusText: 'Выполнена',
      priority: 'low',
      priorityText: 'Низкий',
      color: '#EB1090',
      date: '19.11.2020, 10:20',
      description: 'Поехать в питомник, нырнуть в щенков, забрать всех домой',
    },
    {
      id: 4,
      name: 'Выбросить мусор',
      slug: 'vibrosit-musor',
      status: 'new',
      statusText: 'Новая',
      priority: 'high',
      priorityText: 'Высокий',
      color: '#EB5757',
      date: '31.12.2020, 08:00',
      description:
        'Накопить два пакета мусора, проснуться от запаха, проветрить, достать третий пакет',
    },
    {
      id: 5,
      name: 'Починить полку',
      slug: 'provodit-vrema',
      status: 'new',
      statusText: 'Новая',
      priority: 'medium',
      priorityText: 'Средний',
      color: '#EB5757',
      date: '26.11.2020, 19:10',
      description: 'Приготовить шуруповерт, молоток и скотч',
    },
    {
      id: 6,
      name: 'Сходить в театр',
      slug: 'provodit-vrema',
      status: 'new',
      statusText: 'Новая',
      priority: 'low',
      priorityText: 'Низкий',
      color: '#EB5757',
      date: '29.11.2020, 19:00',
      description: 'Погладить пиджак, отключить телефон',
    },
  ]);

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const [filteredTodos, setFilteredTodo] = useState(todos);
  const [statusFilter, setStatusFilter] = useState([
    { name: 'Новые', type: 'new', current: false },
    { name: 'Выполненные', type: 'done', current: false },
    { name: 'Все', type: 'all', current: true },
  ]);
  const [priorityFilter, setPriorityFilter] = useState([
    { name: 'Высокий', type: 'high', current: false },
    { name: 'Средний', type: 'medium', current: false },
    { name: 'Низкий', type: 'low', current: false },
  ]);

  const setFilterStatus = type => {
    const tempPrioritysFilter = priorityFilter.map(i => {
      return { ...i, current: false };
    });
    const tempStatusFilter = statusFilter.map(i =>
      i.type === type ? { ...i, current: true } : { ...i, current: false }
    );
    setPriorityFilter(tempPrioritysFilter);
    setStatusFilter(tempStatusFilter);
  };

  const setFilterPriority = type => {
    const tempPrioritysFilter = priorityFilter.map(i =>
      i.type === type ? { ...i, current: true } : { ...i, current: false }
    );
    setPriorityFilter(tempPrioritysFilter);
  };

  useEffect(() => {
    let tempTodos = [...todos];

    const statusType = statusFilter.find(i => i.current === true).type;

    const priorityBtnCurrent = priorityFilter.find(i => i.current === true);
    const priorityType = priorityBtnCurrent ? priorityBtnCurrent.type : null;

    const filteredTodosByStatus =
      statusType === 'all'
        ? tempTodos
        : tempTodos.filter(i => i.status === statusType);

    const filteredTodosByPriority = filteredTodosByStatus.filter(i =>
      priorityType ? i.priority === priorityType : true
    );
    setFilteredTodo(filteredTodosByPriority);
  }, [statusFilter, priorityFilter, todos]);

  const [priorityIsOpen, setPriorityIsOpen] = useState(true);
  const [fullTodo, setFullTodo] = useState({ isOpen: false, todoId: '' });

  const toggleStatusTodo = id => {
    const tempTodos = [...todos];
    tempTodos.map(todo =>
      todo.id === id
        ? todo.status === 'new'
          ? ((todo.status = 'done'), (todo.statusText = 'Выполнена'))
          : ((todo.status = 'new'), (todo.statusText = 'Новая'))
        : todo
    );
    setTodo(tempTodos);
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const initialTodo = {
    name: '',
    status: 'new',
    statusText: 'Новая',
    priority: 'high',
    priorityText: 'Высокий',
    color: '#EB5757',
    date: '',
    description: '',
  };
  const [todoInEdit, setTodoInEdit] = useState(initialTodo);
  const handleInput = e => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    if (name === 'priority') {
      switch (value) {
        case 'high':
          setTodoInEdit({
            ...todoInEdit,
            [name]: value,
            priorityText: 'Высокий',
          });
          break;
        case 'medium':
          setTodoInEdit({
            ...todoInEdit,
            [name]: value,
            priorityText: 'Средний',
          });
          break;
        case 'low':
          setTodoInEdit({
            ...todoInEdit,
            [name]: value,
            priorityText: 'Низкий',
          });
          break;
        default:
          break;
      }
    } else {
      setTodoInEdit({ ...todoInEdit, [name]: value });
    }
    if (todoInEdit.name) setNameIsValid(true);
  };

  const getDate = date => date.split(', ')[0];
  const getTime = date => date.split(', ')[1];

  const getTodo = slug => {
    let tempTodos = [...todos];
    const todo = tempTodos.find(todo => todo.slug === slug);
    return todo;
  };

  const getId = () => {
    return ~~(Math.random() * 1000000);
  };

  const getSlug = text => {
    let tempText = text.toLowerCase().split(' ').join('-');
    return slugify(tempText);
  };

  const openEditModal = id => {
    let tempTodo = todos.find(todo => todo.id === id);
    setTodoInEdit(tempTodo);
    setEditMode(true);
    setModalIsOpen(true);
  };

  const openEmptyModal = () => {
    setTodoInEdit(initialTodo);
    setModalIsOpen(true);
  };

  const [nameIsValid, setNameIsValid] = useState(true);
  const createNewOne = e => {
    e.preventDefault();
    if (todoInEdit.name) {
      let id = getId();
      let slug = getSlug(todoInEdit.name);
      let priorityText;
      if (todoInEdit.priority === 'high') priorityText = 'Высокий';
      if (todoInEdit.priority === 'medium') priorityText = 'Средний';
      if (todoInEdit.priority === 'low') priorityText = 'Низкий';
      let newOne = {
        id: id,
        name: todoInEdit.name,
        slug: slug,
        status: 'new',
        statusText: 'Новая',
        priority: todoInEdit.priority,
        priorityText: priorityText,
        color: todoInEdit.color,
        date: todoInEdit.date,
        description: todoInEdit.description,
      };
      let tempTodos = [...todos, newOne];
      setTodo(tempTodos);
      setModalIsOpen(false);
    } else {
      setNameIsValid(false);
    }
  };

  const saveTodo = id => {
    let tempTodos = todos.map(todo => {
      if (todo.id === id) {
        return todoInEdit;
      }
      return todo;
    });
    setTodo(tempTodos);
    setModalIsOpen(false);
    setEditMode(false);
  };

  const history = useHistory();
  const deleteTodo = id => {
    let tempTodos = [...todos].filter(todo => todo.id !== id);
    setModalIsOpen(false);
    history.push('/');
    setTodo(tempTodos);
  };

  const store = {
    todos: [todos, setTodo],
    filteredTodos: [filteredTodos, setFilteredTodo],
    statusFilter: [statusFilter, setStatusFilter],
    priorityFilter: [priorityFilter, setPriorityFilter],
    priorityIsOpen: [priorityIsOpen, setPriorityIsOpen],
    fullTodo: [fullTodo, setFullTodo],
    modalIsOpen: [modalIsOpen, setModalIsOpen],
    todoInEdit: [todoInEdit, setTodoInEdit],
    editMode: [editMode, setEditMode],
    menuIsOpen: [menuIsOpen, setMenuIsOpen],
    setFilterStatus,
    setFilterPriority,
    nameIsValid,
    toggleStatusTodo,
    handleInput,
    getTodo,
    getSlug,
    createNewOne,
    getDate,
    getTime,
    openEditModal,
    openEmptyModal,
    saveTodo,
    deleteTodo,
  };
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}
