import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

export default context => Object.assign(({ name, inputProps = {}, ...props }) => (
  <TextField
    name={name}
    value={context.state.form[name]}
    onChange={context.handleChange}
    inputProps={{ required: true, ...inputProps }}
    fullWidth
    margin="dense"
    {...props}
  />
), {
  propTypes: {
    name: PropTypes.string.isRequired,
    inputProps: PropTypes.shape(),
  },
  defaultProps: {
    inputProps: {},
  },
});
