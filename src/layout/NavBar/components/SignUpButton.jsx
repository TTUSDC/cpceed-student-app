// @flow
import React from 'react';
import Button from '@material-ui/core/Button';

type Props = { toggleAuth: (event: SyntheticEvent<HTMLButtonElement>) => null };

// Opens up the Auth Modal when clicked
const SignUpButton = (props: Props) => {
  const { toggleAuth } = props;
  return (
    <Button onClick={toggleAuth} color='inherit'>
      Sign Up
    </Button>
  );
};

export default SignUpButton;
