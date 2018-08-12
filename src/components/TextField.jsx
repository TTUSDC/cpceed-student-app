// @flow
import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

type Props = {
  title: string,
  // Name of the value to change
  tag: string,
  // Whether or not to hide the text inside the inputs
  hide: boolean,
  // The role that is currently selected
  currentValue: string,
  // A change handler for when the user changes value
  onNewValue: (string) => null,
  // Whether or not there is an error
  error?: string,
}

// Handles password input changes and errors
const TextField = (props: Props) => {
  const {
    title,
    hide,
    tag,
    error,
    onNewValue,
    currentValue,
  } = props;

  const hasError = Boolean(error);

  return (
    <FormControl
      error={hasError}
    >
      <InputLabel htmlFor={tag}>{title}</InputLabel>
      <Input
        id={tag}
        value={currentValue}
        onChange={onNewValue(tag)}
        inputProps={{
          type: hide ? 'password' : null,
        }}
      />
      <FormHelperText id={`${tag}-error`} display={hasError ? 'none' : null}>
        {error}
      </FormHelperText>
    </FormControl>
  );
};

TextField.defaultProps = {
  hide: false,
  error: '',
};

export default TextField;
