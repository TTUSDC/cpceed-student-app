import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

// Opens up the Auth Modal when clicked
const SignUpButton = (props) => {
  const { toggleAuth } = props;
  return (
    <Button onClick={toggleAuth} color='inherit'>
      Sign Up
    </Button>
  );
};

SignUpButton.propTypes = {
  toggleAuth: PropTypes.func.isRequired,
};

export default SignUpButton;
