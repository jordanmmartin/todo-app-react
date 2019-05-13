import { Link } from 'react-router';
import PropTypes from 'prop-types';
import React from 'react';

import { api, getApiPromise } from '../helpers/api';
import Button from './button';
import Navbar from './navbar';
import TodoForm from './todo-form';
import TodoLink from './todo-link';
import Todos from './todos';
import Summary from './summary';

/**
 * TodosPage component
 * @class
 */
class TodosPage extends React.Component {
  /**
   * Base CSS class
   * @static
   */
  static baseCls = 'todos-page'

  /**
   * Prop types
   * @static
   */
  static propTypes = {
    params: PropTypes.object,
  };

  /**
   * Constructor
   * @constructor
   *
   * @param  {object} props - Props
   */
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      filterBy: null,
    };

    this.addTodo = this.addTodo.bind(this);
    this.postTodo = this.postTodo.bind(this);
    this.setFilterBy = this.setFilterBy.bind(this);
    this.updateTodos = this.updateTodos.bind(this);
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    api('GET', null, this.updateTodos);
  }

  /**
   * Add todo
   *
   * @param  {string} text - Todo text
   */
  addTodo(text) {
    if (!text) {
      return;
    }

    api('POST', { text }, this.postTodo);
  }

  /**
   * Posts new todo to the todos collection
   *
   * @param  {object} json - Resulting JSON from fetch
   */
  postTodo(json) {
    this.setState({
      todos: [...json],
    });
  }

  /**
   * Set filterBy state
   *
   * @param {string} filterBy - filterBy state
   */
  setFilterBy(filterBy) {
    this.setState({ filterBy });
  }

  /**
   * Update todos array state
   *
   * @param  {Array} todos - Array of todo objects
   */
  updateTodos(todos) {
    this.setState({ todos });
  }

  putTodo = json => {
    const index = this.state.todos.findIndex(todo => {
      return todo.id === json.id;
    });

    this.updateTodos(
      [
        ...this.state.todos.slice(0, index),
        json,
        ...this.state.todos.slice(index + 1),
      ]
    );
  }

  countActiveTodos = () => {
    let activeTodos = this.state.todos.filter(todo => todo.status === 'active')
    return activeTodos.length
  }

  handleCompleteAll = () => {
    console.log('COMPLETING ALL...');
    let activeTodos = this.state.todos.filter(todo => todo.status === 'active')
    console.log(activeTodos);
    activeTodos.forEach(todo => {
      const newTodo = Object.assign({}, todo);
      newTodo.status = 'complete'

      api('PUT', newTodo, this.putTodo);
    })
  }

  handleArchiveAll = () => {
    console.log('Archiving all...');
    let completedTodos = this.state.todos.filter(todo => todo.status === 'complete')
    completedTodos.forEach(todo => {

    })
  }

  /**
   * Render
   * @returns {ReactElement}
   */
  render() {
    console.log(this.state.todos);
    return (
      <div className={this.baseCls}>
        <Navbar filterBy={this.state.filterBy} onClickFilter={this.setFilterBy} handleArchiveAll={this.handleArchiveAll}/>
        <Summary numRemaining={this.countActiveTodos()} handleCompleteAll={this.handleCompleteAll}/>
        <TodoForm onSubmit={this.addTodo} />

        <Todos
          filterBy={this.state.filterBy}
          todos={this.state.todos}
          updateTodos={this.updateTodos}
        />
      </div>
    );
  }
}

export default TodosPage;
