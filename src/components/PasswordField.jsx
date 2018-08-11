import React from 'react';
import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

// Handles password input changes and errors
const PasswordField = (props) => {
  const {
    title,
    name,
    error,
    onNewValue,
    currentValue,
  } = props;

  const hasError = Boolean(error);

  return (
    <FormControl
      error={hasError}
    >
      <InputLabel htmlFor={name}>{title}</InputLabel>
      <Input
        id={name}
        value={currentValue}
        onChange={onNewValue(name)}
        inputProps={{
          type: 'password',
        }}
      />
      <FormHelperText display={hasError ? 'none' : null}>
        {error}
      </FormHelperText>
    </FormControl>
  );
};

PasswordField.propTypes = {
  // Title for the input
  title: PropTypes.string.isRequired,
  // Name of the value to change
  name: PropTypes.string.isRequired,
  // The role that is currently selected
  currentValue: PropTypes.string.isRequired,
  // A change handler for when the user changes value
  onNewValue: PropTypes.func.isRequired,
  // Whether or not there is an error
  error: PropTypes.string,
};

PasswordField.defaultProps = {
  error: '',
};

export default PasswordField;
