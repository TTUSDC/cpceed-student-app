import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  root: {
    display: 'flex',
    textAlign: 'center',
  },
});

/**
 * A Modal wrapper for Material UI that has a centered content
 */
export const ModalView = (props) => {
  const {
    open,
    classes,
    children,
    toggle,
    fullScreen,
  } = props;

  return (
    // Make it fullscreen and allow for the user to quit in mobile
    <Dialog
      fullScreen={fullScreen}
      open={open}
      className={classes.root}
      onClose={toggle}
    >
      <DialogContent>
        {/* For forms you want to render a DialogContentText along with a Input component */}
        {children}
      </DialogContent>
    </Dialog>
  );
};

ModalView.propTypes = {
  // determines whether or not the modal is open, usually based off the
  // state of the container component
  open: PropTypes.bool.isRequired,
  // Toggles the open state
  toggle: PropTypes.func.isRequired,
  // Material JSS Classes
  classes: PropTypes.shape({}).isRequired,
  // Content of the Modal
  children: PropTypes.shape({}),
  // Will change to true when screen is bellow sm breakpoint
  fullScreen: PropTypes.bool.isRequired,
};

ModalView.defaultProps = {
  children: null,
};
export default withStyles(styles)(withMobileDialog()(ModalView));
