import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from './button';
import React from 'react';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  filterBy: PropTypes.string,
  onClickFilter: PropTypes.func,
  handleArchiveAll: PropTypes.func
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  filterBy: '',
  onClickFilter: noop,
  handleArchiveAll: noop
};



/**
 * Navbar component
 * @returns {ReactElement}
 */
// const Navbar = ({ filterBy, onClickFilter, handleArchiveAll, filter }) => {
class Navbar extends React.Component {
  /**
   * Base CSS class
   */
  componentDidMount(){
    this.props.onClickFilter(this.props.filter)
  }

  render() {
    const baseCls = 'navbar'

    let activeLinkCls = `${baseCls}__item`;
    activeLinkCls += this.props.filterBy === 'active' ? ` ${baseCls}__item--active` : '';

    let completedLinkCls = `${baseCls}__item`;
    completedLinkCls += this.props.filterBy === 'completed' ? ` ${baseCls}__item--active` : '';

    let archivedLinkCls = `${baseCls}__item`;
    archivedLinkCls += this.props.filterBy === 'archived' ? ` ${baseCls}__item--active` : '';
    return (
      <div className={baseCls}>
        <NavLink
          to="/all"
          activeClassName={`${baseCls}__item--active`}
          className={`${baseCls}__item`}
          onClick={() => this.props.onClickFilter('')}
        >
          All
        </NavLink>
        <NavLink
          to="/active"
          className={activeLinkCls}
          onClick={() => this.props.onClickFilter('active')}
        >
          Active
        </NavLink>
        <NavLink
          to="/completed"
          className={completedLinkCls}
          onClick={() => this.props.onClickFilter('completed')}
        >
          Completed
        </NavLink>
        <NavLink
          to="/archived"
          className={archivedLinkCls}
          onClick={() => this.props.onClickFilter('archived')}
        >
          Archived
        </NavLink>
        <Button text='Archive all complete' onClick={this.props.handleArchiveAll}/>
      </div>
    );
  }
}

// Navbar.propTypes = propTypes;
// Navbar.defaultProps = defaultProps;

export default Navbar;
