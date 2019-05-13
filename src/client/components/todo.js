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
  state = {
    complete: false
  }

  static propTypes = {
    filtered: PropTypes.bool,
    onClickDelete: PropTypes.func,
    onClickTodo: PropTypes.func,
    status: PropTypes.string,
    text: PropTypes.string,
  };

  checkCompletion = () => {
    if(this.props.status === 'complete'){
      this.setState({
        complete: true
      })
    }
  }

  handleCheck = () => {
    this.props.onClickTodo()
    if(event.target.checked === true){
      this.setState({
        complete: true
      })
    } else {
      this.setState({
        complete: false
      })
    }
  }

  handleTextClick = () => {
    if(this.state.complete){
      this.setState({
        complete: false
      })
    } else{
      this.setState({
        complete: true
      })
    }
    this.props.onClickTodo()
  }

  componentDidMount() {
    this.checkCompletion()
  }

  // static todoCls = baseCls
  //   + (this.props.status === 'complete' ? ' todo--status-complete' : '')
  //   + (this.props.filtered ? ' todo--filtered' : '');

  render(){
    // console.log('TODO PROPS', this.props)
    // console.log('TODO state', this.state)
    let baseCls = 'todo';
    let todoCls = baseCls
      + (this.state.complete === true ? ' todo--status-complete' : '')
      + (this.props.filtered ? ' todo--filtered' : '');
    return (
      <li className={todoCls}>
          <div className="pretty p-icon p-rotate">
              <input type="checkbox" onChange={this.handleCheck} defaultChecked={(this.props.status === 'complete')} />
              <div className="state p-success">
                  <i className="icon mdi mdi-check"></i>
                  <label></label>
              </div>
          </div>
          <TodoLink text={this.props.text} />
          <div className="archive-button">
            <Button text="Archive" onClick={this.props.onClickDelete} />
          </div>
          <span className="mdi mdi-close" onClick={this.props.onClickDelete}></span>
          <hr/>
      </li>
    );
  }
}

// Todo.propTypes = propTypes;
// Todo.defaultProps = defaultProps;

export default Todo;
