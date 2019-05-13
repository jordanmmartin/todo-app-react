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
    complete: false,
    currentStatus: ''
  }

  static propTypes = {
    filtered: PropTypes.bool,
    onClickDelete: PropTypes.func,
    onClickTodo: PropTypes.func,
    status: PropTypes.string,
    text: PropTypes.string,
  };

  checkCompletion = () => {
    if(this.props.status !== 'active'){
      this.setState({
        complete: true
      })
    }
  }

  checkStatusChange = () => {
    if(this.props.status !== this.state.currentStatus){
      if(this.props.status !== 'active'){
        this.setState({
        complete: true,
        currentStatus: this.props.status
        })
      } else {
        this.setState({
        complete: false,
        currentStatus: this.props.status
        })
      }
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



  componentDidUpdate() {
    this.checkStatusChange()
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
              <input type="checkbox" onChange={this.handleCheck} checked={this.state.complete}/>
              <div className="state p-success">
                  <i className="icon mdi mdi-check"></i>
                  <label></label>
              </div>
          </div>
          <TodoLink text={this.props.text} />
          <div className="archive-button">
            {(this.props.status === 'complete') && <Button text="Archive" onClick={this.props.onClickArchive} />}
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
