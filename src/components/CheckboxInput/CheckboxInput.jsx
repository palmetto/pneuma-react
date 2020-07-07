import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { v4 as uuid } from 'uuid';
import './CheckboxInput.scss';

const CheckboxInput = ({
  id,
  className,
  error,
  isChecked,
  isDisabled,
  onChange,
  children,
}) => {
  const inputId = id || uuid();

  const handleChange = e => {
    onChange(e.target.checked);
  };

  const labelClasses = classNames(
    'checkboxInputInstructions',
    { error },
  );

  return (
    <>
      <div className={classNames('checkboxInput', className, { isDisabled })}>
        <input
          aria-invalid={!!error}
          id={inputId}
          checked={isChecked}
          disabled={isDisabled}
          onChange={handleChange}
          type="checkbox"
          className="input"
        />
        <label htmlFor={inputId} className={labelClasses}>{children}</label>
      </div>
      {error && <div>{error}</div>}
    </>
  );
};

CheckboxInput.defaultProps = {
  id: undefined,
  className: '',
  error: false,
  isChecked: false,
  isDisabled: false,
};

CheckboxInput.propTypes = {
  /**
   * The id attribute of the input
   */
  id: PropTypes.string,
  /**
   * Additional classes to add
   */
  className: PropTypes.string,
  /**
   * Mark the input field as invalid and display a validation message.
   * Pass a string or node to render a validation message below the input
   */
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.node,
  ]),
  /**
   * The checkbox input "checked" attribute
   */
  isChecked: PropTypes.bool,
  /**
   * If the input should be disabled and not focusable
   */
  isDisabled: PropTypes.bool,
  /**
   * Callback function when input is changed
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Custom content to be displayed to right of checkbox. Can be any valid node/tree, anchors, etc.
   */
  children: PropTypes.node.isRequired,
};

export default CheckboxInput;

