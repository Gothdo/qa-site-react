import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Route } from 'react-router-dom';
import { always } from 'ramda';
import QuestionList from './QuestionList';

const styles = theme => ({
  root: {
    marginLeft: `calc(${theme.drawerWidth}px + 100vw - 100%)`,
  },
  toolbar: theme.mixins.toolbar,
});
const Main = ({ classes }) => (
  <main className={classes.root}>
    <div className={classes.toolbar} />
    <Route exact path="/" render={always(<QuestionList />)} />
    <Route exact path="/questions/unanswered" render={always(<QuestionList unansweredOnly />)} />
  </main>
);
Main.propTypes = {
  classes: PropTypes.shape().isRequired,
};
export default withStyles(styles)(Main);
