import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    textAlign: 'center',
  },
  paper: {
    margin: '48px',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: '32px',
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
  } = props;

  return (
    <Modal
      open={open}
      className={classes.root}
      onClose={toggle}
    >
      <div className={classes.paper}>
        {children}
      </div>
    </Modal>
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
};

ModalView.defaultProps = {
  children: null,
};
export default withStyles(styles)(ModalView);
