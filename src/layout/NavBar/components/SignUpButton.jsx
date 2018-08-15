// @flow
import React from 'react';
import Button from '@material-ui/core/Button';

type Props = { toggleAuth: () => null };

// Opens up the Auth Modal when clicked
const SignUpButton = (props: Props) => {
  const { toggleAuth } = props;

  // We don't want to call toggleAuth with the event passed as an argument
  const handleClick = () => toggleAuth();

  return (
    <Button onClick={handleClick} color='inherit'>
      Sign Up
    </Button>
  );
};

export default SignUpButton;
