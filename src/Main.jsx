import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Route } from 'react-router-dom';
import { always } from 'ramda';
import blue from 'material-ui/colors/blue';
import blueGrey from 'material-ui/colors/blueGrey';
import QuestionList from './QuestionList';
import Question from './Question';

const styles = theme => ({
  '@global': {
    a: {
      textDecoration: 'none',
      color: blue[900],
      '&:active, &:focus': {
        color: blue[500],
        outline: 'none',
      },
    },
    code: {
      fontFamily: "'Roboto Mono'",
    },
    pre: {
      backgroundColor: blueGrey[800],
      color: blueGrey[50],
      padding: '16px',
      margin: '0 -16px',
    },
  },
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
    <Route path="/question/:id" render={({ match }) => <Question id={match.params.id} />} />
  </main>
);
Main.propTypes = {
  classes: PropTypes.shape().isRequired,
};
export default withStyles(styles)(Main);
