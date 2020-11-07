import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { transliterate as tr, slugify } from 'transliteration';

export const StoreContext = React.createContext();
export default function ToDoProvider({ children }) {
  const [todos, setTodo] = useState([
    {
      id: 1,
      name: 'Сходить в магазин',
      slug: 'shodit-v-magazin',
      status: 'done',
      statusText: 'Выполнена',
      priority: 'high',
      priorityText: 'Высокий',
      color: '#F2C94C',
      date: '11.11.2020, 10:18',
      description:
        'Огибающая семейства поверхностей, конечно, естественно трансформирует интеграл по бесконечной области. Однако не все знают, что ортогональный определитель правомочен. Функция B(x,y) поддерживает интеграл от функции комплексной переменной, откуда следует доказываемое равенство. Линейное уравнение категорически масштабирует линейно зависимый критерий сходимости Коши, что неудивительно. Геометрическая прогрессия, как следует из вышесказанного, детерменирована. Интеграл Гамильтона оправдывает интеграл от функции, имеющий конечный разрыв. По сути, прямоугольная матрица оправдывает аксиоматичный интеграл от функции, обращающейся в бесконечность вдоль линии, при этом, вместо 13 можно взять любую другую константу.',
    },
    {
      id: 2,
      name: 'Помыть машину',
      slug: 'pomit-mashinu',
      status: 'done',
      statusText: 'Выполнена',
      priority: 'high',
      priorityText: 'Высокий',
      color: '#EB0000',
      date: '11.11.2020, 10:18',
      description:
        'Взять себя в руки, взять губку, налить воды, налить моющего средства, попросить помыть машину жену',
    },
    {
      id: 3,
      name: 'Помыть кошку',
      slug: 'pomit-koshku',
      status: 'new',
      statusText: 'Новое',
      priority: 'low',
      priorityText: 'Низкий',
      color: '#EB1090',
      date: '11.11.2020, 10:18',
      description:
        'Взять себя в руки, взять губку, налить воды, налить моющего средства, попросить помыть машину жену',
    },
    {
      id: 4,
      name: 'Проводить',
      slug: 'provodit-vrema',
      status: 'new',
      statusText: 'Новая',
      priority: 'medium',
      priorityText: 'Средний',
      color: '#EB5757',
      date: '11.11.2020, 10:18',
      description:
        'Взять себя в руки, взять губку, налить воды, налить моющего средства, попросить помыть машину жену',
    },
    {
      id: 5,
      name: 'Проводить',
      slug: 'provodit-vrema',
      status: 'new',
      statusText: 'Новая',
      priority: 'medium',
      priorityText: 'Средний',
      color: '#EB5757',
      date: '11.11.2020, 10:18',
      description:
        'Взять себя в руки, взять губку, налить воды, налить моющего средства, попросить помыть машину жену',
    },
  ]);

  const [filteredTodos, setFilteredTodo] = useState(todos);
  const [statusFilter, setStatusFilter] = useState([
    { name: 'Новые', type: 'new', current: false },
    { name: 'Выполненные', type: 'done', current: false },
    { name: 'Все', type: 'all', current: true },
  ]);
  const [priority, setPriority] = useState([
    { name: 'Высокий', type: 'high', current: false },
    { name: 'Средний', type: 'med', current: false },
    { name: 'Низкий', type: 'low', current: false },
  ]);

  const filterStatus = type => {
    const tempStatusFilter = statusFilter.map(i =>
      i.type === type ? { ...i, current: true } : { ...i, current: false }
    );
    filterTodos(type);
    setStatusFilter(tempStatusFilter);
  };
  const filterTodos = type => {
    const tempFilteredTodos =
      type === 'all' ? todos : todos.filter(i => i.status === type);
    setFilteredTodo(tempFilteredTodos);
  };

  useEffect(() => {
    let activeStatus;
    statusFilter.forEach(i => {
      if (i.current === true) activeStatus = i.type;
    });
    filterTodos(activeStatus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos]);

  const [priorityIsOpen, setPriorityIsOpen] = useState(true);
  const [fullTodo, setFullTodo] = useState({ isOpen: false, todoId: '' });

  const toggleStatusTodo = id => {
    const tempTodos = [...todos];
    tempTodos.map(todo =>
      todo.id === id
        ? todo.status === 'new'
          ? ((todo.status = 'done'), (todo.statusText = 'Выполнена'))
          : ((todo.status = 'new'), (todo.statusText = 'Новое'))
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
    let tempText = text.split(' ').join(', ');
    return slugify(tempText);
  };

  const getEditModal = id => {
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
    priority: [priority, setPriority],
    priorityIsOpen: [priorityIsOpen, setPriorityIsOpen],
    fullTodo: [fullTodo, setFullTodo],
    modalIsOpen: [modalIsOpen, setModalIsOpen],
    todoInEdit: [todoInEdit, setTodoInEdit],
    editMode: [editMode, setEditMode],
    filterStatus,
    nameIsValid,
    toggleStatusTodo,
    handleInput,
    getTodo,
    getSlug,
    createNewOne,
    getDate,
    getTime,
    getEditModal,
    openEmptyModal,
    saveTodo,
    deleteTodo,
  };
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}
