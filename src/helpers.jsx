import React from 'react';
import Tooltip from 'material-ui/Tooltip';
import moment from 'moment';
import approx from 'approximate-number';
import PropTypes from 'prop-types';

export const RelativeDate = ({ raw, ...rest }) => {
  const date = moment(raw);
  return (
    <Tooltip title={date.format('YYYY-MM-DD HH:mm:ss')}>
      <time dateTime={date.toISOString()} {...rest}>
        {date.fromNow()}
      </time>
    </Tooltip>
  );
};
RelativeDate.propTypes = {
  raw: PropTypes.string.isRequired,
};

export const formatScore = score => (score > 0 ? '+' : '') + approx(score);
