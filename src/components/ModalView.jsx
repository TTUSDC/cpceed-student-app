// @flow

import logger from 'logger';
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { withStyles } from '@material-ui/core/styles';

const styles ={
  root: {
    display: 'flex',
    textAlign: 'center',
  },
};

export type Props = {
  // determines whether or not the modal is open, usually based off the
  // state of the container component
  open: boolean,
  // Toggles the open state
  closeModal: (reason: string) => null,
  // Material JSS Classes
  classes: Object,
  // Content of the Modal
  children?: Object,
  // Will change to true when screen is bellow sm breakpoint
  fullScreen: boolean,
};

/**
 * A Modal wrapper for Material UI that has a centered content
 */
export const ModalView = (props: Props) => {
  const {
    open,
    classes,
    children,
    closeModal,
    fullScreen,
  } = props;

  // Do not pass event as an argument
  const handleClosing = (reason) => () => {
    logger.info(`closed with: ${reason}`)
    closeModal(reason);
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      className={classes.root}
      onClose={handleClosing('esckey')}
    >
      <DialogContent>
        {/* For forms you want to render a DialogContentText along with a Input component */}
        {children}
      </DialogContent>
      <DialogActions>
        {/* Closes the Modal when you click the close button or hit Esc */}
        <Button className='close-button' onClick={handleClosing('closebtn')}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ModalView.defaultProps = {
  children: {},
};
export default withStyles(styles)(withMobileDialog()(ModalView));
