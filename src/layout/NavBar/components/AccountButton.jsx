// @flow
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

type Props = { toggle: (event: SyntheticEvent<HTMLButtonElement>) => null };

// Displays a button with a Account symbol on it
const AccountButton = (props: Props) => {
  const { toggle } = props;
  return (
    <IconButton onClick={toggle} color='inherit'>
      <AccountCircle />
    </IconButton>
  );
};

export default AccountButton;
