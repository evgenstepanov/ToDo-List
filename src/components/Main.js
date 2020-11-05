import React from 'react';
import './Main.css';
import TodoList from './TodoList';
import FullTodo from './FullTodo';
import { Switch, Route } from 'react-router-dom';

export default function Main() {
  return (
    <div className='Main'>
      <Switch>
        <Route exact path='/'>
          <TodoList />
        </Route>
        <Route exact path='/:slug'>
          <FullTodo />
        </Route>
        <Route>
          <TodoList />
        </Route>
      </Switch>
    </div>
  );
}
