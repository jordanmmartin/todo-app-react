import PropTypes from 'prop-types';
import React from 'react';

import { api } from '../helpers/api';
import Todo from './todo';

const noop = () => {};


/**
 * Prop Types
 * @private
 */
// const propTypes = {
//   filterBy: PropTypes.string,
//   todos: PropTypes.arrayOf(PropTypes.object),
//   updateTodos: PropTypes.func,
// };

/**
 * Default Props
 * @private
 */
// const defaultProps = {
//   filterBy: '',
//   todos: [],
//   updateTodos: noop,
// };

/**
 * Todos component
 * @returns {ReactElement}
 */

//Changed Todos to a class component so it would trigger rerenders when passed new props
// const Todos = ({ filterBy, todos, updateTodos }) => {
class Todos extends React.Component {

  /**
   * Base CSS class
   */
  static baseCls = 'todos';

  /**
   * Prop Types
   * @static
   */
  static propTypes = {
    filterBy: PropTypes.string,
    todos: PropTypes.arrayOf(PropTypes.object),
    updateTodos: PropTypes.func,
  };

  /**
   * Callback function to delete todo from todos collection
   *
   * @param  {object} json - Resulting JSON from fetch
   */
  deleteTodo = json => {
    const index = this.props.todos.findIndex(todo => {
      return todo.id === json.id;
    });

    this.props.updateTodos(
      [
        ...this.props.todos.slice(0, index),
        ...this.props.todos.slice(index + 1),
      ]
    );
  }

  /**
   * Callback function to replace todo with results of fetching the todo PUT endpoint
   *
   * @param  {object} json - Resulting JSON from fetch
   */
  putTodo = json => {
    const index = this.props.todos.findIndex(todo => {
      return todo.id === json.id;
    });

    this.props.updateTodos(
      [
        ...this.props.todos.slice(0, index),
        json,
        ...this.props.todos.slice(index + 1),
      ]
    );
  }

  /**
   * Click handler for clicking on delete button
   * Deletes todo
   *
   * @param {object} todo - Todo object
   */
  onClickDelete = todo => {
    api('DELETE', todo, this.deleteTodo);
  };

  /**
   * Click handler for clicking on the todo
   * Toggles status state of Todo
   *
   * @param {object} todo - Todo object
   */
  onClickTodo = todo => {
    const newTodo = Object.assign({}, todo);
    newTodo.status = todo.status === 'active' ? 'complete' : 'active';
    // newTodo.archive = false;

    api('PUT', newTodo, this.putTodo);
  }

  onClickArchive = (todo) => {
    if(todo.status === 'complete'){
      const newTodo = Object.assign({}, todo);
      newTodo.status = 'archived'
      // newTodo.archive = false;

      api('PUT', newTodo, this.putTodo);
    }
  }

  /**
   * Renders All Todos
   *
   * @returns {Array} - Returns an array of Todo React Elements
   */
  renderTodos = () => {
    if (!Array.isArray(this.props.todos)) {
      return null;
    }

    return this.props.todos.map(todo => {
      let filtered;
      switch (this.props.filterBy) {
        case 'active':
          filtered = todo.status !== 'active';
          break;
        case 'completed':
          filtered = todo.status !== 'complete';
          break;
        case 'archived':
          filtered = todo.status !== 'archived';
          break;
        default:
          filtered = false;
      }

      return (
        <Todo
          key={todo.id}
          filtered={filtered}
          onClickDelete={this.onClickDelete.bind(this, todo)}
          onClickTodo={this.onClickTodo.bind(this, todo)}
          onClickArchive={this.onClickArchive.bind(this, todo)}
          status={todo.status}
          text={todo.text}
        />
      );
    })
  }

  render() {
    // console.log('todos props', this.props)
    return (
      <ul className={this.baseCls}>
        {this.renderTodos()}
      </ul>
    )
  }
};

// Todos.propTypes = propTypes;
// Todos.defaultProps = defaultProps;

export default Todos;
