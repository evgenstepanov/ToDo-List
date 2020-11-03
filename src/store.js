import React, { useState } from 'react';

export const StoreContext = React.createContext();
export default function ToDoProvider({ children }) {
  const [todos, setTodo] = useState([
    {
      id: 1,
      name: 'Сходить в магазин',
      status: 'done',
      priority: 'high',
      priorityText: 'Высокий',
      color: '#F2C94C',
      date: new Date(),
      description:
        'Огибающая семейства поверхностей, конечно, естественно трансформирует интеграл по бесконечной области. Однако не все знают, что ортогональный определитель правомочен. Функция B(x,y) поддерживает интеграл от функции комплексной переменной, откуда следует доказываемое равенство. Линейное уравнение категорически масштабирует линейно зависимый критерий сходимости Коши, что неудивительно. Геометрическая прогрессия, как следует из вышесказанного, детерменирована. Интеграл Гамильтона оправдывает интеграл от функции, имеющий конечный разрыв. По сути, прямоугольная матрица оправдывает аксиоматичный интеграл от функции, обращающейся в бесконечность вдоль линии, при этом, вместо 13 можно взять любую другую константу.',
    },
    {
      id: 2,
      name: 'Помыть машину',
      status: 'done',
      priority: 'high',
      priorityText: 'Средний',
      color: '#EB5757',
      date: new Date(),
      description:
        'Взять себя в руки, взять губку, налить воды, налить моющего средства, попросить помыть машину жену',
    },
  ]);
  const [menu, setMenu] = useState([
    { name: 'Новые', className: 'new', current: false },
    { name: 'Выполненные', className: 'done', current: false },
    { name: 'Все', className: 'all', current: true },
  ]);
  const [priority, setPriority] = useState([
    { name: 'Высокий', className: 'high', current: false },
    { name: 'Средний', className: 'med', current: false },
    { name: 'Низкий', className: 'low', current: false },
  ]);
  const [priorityIsOpen, setPriorityIsOpen] = useState(true);

  console.log(todos);

  const store = {
    todos: [todos, setTodo],
    menu: [menu, setMenu],
    priority: [priority, setPriority],
    priorityIsOpen: [priorityIsOpen, setPriorityIsOpen],
  };
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}
