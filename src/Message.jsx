import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});

const Message = ({
  text,
  onClose,
  classes,
  ...props
}) => (
  <Snackbar
    message={text}
    autoHideDuration={5000}
    action={(
      <IconButton
        onClick={onClose}
        color="inherit"
        className={classes.close}
      >
        <CloseIcon />
      </IconButton>
    )}
    onClose={onClose}
    {...props}
  />
);
Message.propTypes = {
  text: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Message);

export const messages = {
  accountCreated: 'Account successfully created.',
};
