import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

// Displays a button with a Account symbol on it
const AccountButton = (props) => {
  const { toggle } = props;
  return (
    <IconButton onClick={toggle} color='inherit'>
      <AccountCircle />
    </IconButton>
  );
};

AccountButton.propTypes = {
  toggle: PropTypes.func.isRequired,
};

export default AccountButton;
