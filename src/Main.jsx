import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import QuestionList from './QuestionList';

const styles = theme => ({
  root: {
    marginLeft: theme.drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
});
const Main = ({ classes }) => (
  <main className={classes.root}>
    <div className={classes.toolbar} />
    <QuestionList />
  </main>
);
Main.propTypes = {
  classes: PropTypes.shape().isRequired,
};
export default withStyles(styles)(Main);
