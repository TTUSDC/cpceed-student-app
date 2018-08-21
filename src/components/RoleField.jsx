import React from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { AuthStates } from 'redux/actions/userActions';

type Props = {
  // The name of the Input
  name: string,
  // The role that is currently selected
  currentValue?: string,
  // A change handler for when the user is picking their role
  onNewValue: (string) => null,
};

// Turn AuthStates from actions.js into array for Select
const authArray = [];
Object.keys(AuthStates).forEach((key) => {
  if (AuthStates[key] !== 'guest') {
    authArray.push(AuthStates[key]);
  }
});

// Determines what the user's role is
const RoleField = (props: Props) => {
  const { currentValue, name, onNewValue } = props;
  return (
    <FormControl>
      <InputLabel htmlFor='role-select'>Role</InputLabel>
      <Select
        id='selector'
        value={currentValue}
        onChange={onNewValue(name)}
        inputProps={{
          name: 'role',
          id: 'role-select',
        }}
      >
        {
          authArray.map(each => <MenuItem value={each} key={each}>{each}</MenuItem>)
        }
      </Select>
    </FormControl>
  );
};

RoleField.defaultProps = {
  currentValue: 'student',
};

export default RoleField;
