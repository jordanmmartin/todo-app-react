import PropTypes from 'prop-types';
import React from 'react';

import Button from './button';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  onClick: PropTypes.func,
  numRemaining: PropTypes.number,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  onClick: noop,
  numRemaining: 0,
};

/**
 * Link component
 * @returns {ReactElement}
 */
const Summary = ({ numRemaining, onClick }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'summary';

  return (
    <div className={baseCls}>
      {`${numRemaining} tasks remaining`}
      <Button text="Complete All" onClick={onClick} />
    </div>
  );
};

Summary.propTypes = propTypes;
Summary.defaultProps = defaultProps;

export default Summary;
