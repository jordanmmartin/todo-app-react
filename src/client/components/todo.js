import PropTypes from 'prop-types';
import React from 'react';

import Button from './button';
import TodoLink from './todo-link';

// import Icon from '@mdi/react'
import { mdiCheck } from '@mdi/js'

const noop = () => {};

const baseCls = 'todo';
/**
 * Prop Types
 * @private
 */
// const propTypes = {
//   filtered: PropTypes.bool,
//   onClickDelete: PropTypes.func,
//   onClickTodo: PropTypes.func,
//   status: PropTypes.string,
//   text: PropTypes.string,
// };

/**
 * Default Props
 * @private
 */
// const defaultProps = {
//   filtered: false,
//   onClickDelete: noop,
//   onClickTodo: noop,
//   status: '',
//   text: '',
// };

/**
 * Todo component
 * @returns {ReactElement}
 */
// const Todo = ({ filtered, onClickDelete, onClickTodo, status, text }) => {
class Todo extends React.Component {
  /**
   * Base CSS class
   */
  // static baseCls = 'todo';

  static propTypes = {
    filtered: PropTypes.bool,
    onClickDelete: PropTypes.func,
    onClickTodo: PropTypes.func,
    status: PropTypes.string,
    text: PropTypes.string,
  };

  // static todoCls = baseCls
  //   + (this.props.status === 'complete' ? ' todo--status-complete' : '')
  //   + (this.props.filtered ? ' todo--filtered' : '');

  render(){
    let baseCls = 'todo';
    let todoCls = baseCls
      + (this.props.status === 'complete' ? ' todo--status-complete' : '')
      + (this.props.filtered ? ' todo--filtered' : '');
    return (
      <li className={todoCls}>
        <div className="pretty p-icon p-rotate">
            <input type="checkbox" />
            <div className="state p-success">
                <i className="icon mdi mdi-check"></i>
                <label></label>
            </div>
        </div>
        <TodoLink text={this.props.text} onClick={this.props.onClickTodo} />

        <Button text="Delete" onClick={this.props.onClickDelete} />
      </li>
    );
  }
}

// Todo.propTypes = propTypes;
// Todo.defaultProps = defaultProps;

export default Todo;
