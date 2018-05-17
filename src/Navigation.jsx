import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import PropTypes from 'prop-types';
import { Route, NavLink, Link } from 'react-router-dom';
import { always } from 'ramda';

const styles = ({ drawerWidth, mixins: { toolbar }, spacing }) => ({
  toolbar: {
    ...toolbar,
    display: 'flex',
    justifyContent: 'space-between',
  },
  drawerPaper: {
    width: drawerWidth,
  },
  appBar: {
    backgroundColor: blue[500],
    left: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
  },
  li: {
    padding: 0,
  },
  link: {
    textDecoration: 'none',
    padding: `${spacing.unit}px ${spacing.unit * 3}px`,
    width: '100%',
    fontSize: '1em',
    '&:focus': {
      backgroundColor: grey[300],
      outline: 'none',
    },
  },
  activeLink: {
    color: blue[900],
  },
  navRight: {
    display: 'inline',
    textTransform: 'uppercase',
    padding: spacing.unit,
    color: 'inherit',
    fontSize: '1em',
    '&:focus': {
      color: grey[300],
    },
  },
});

const leftNav = [
  { path: '/', text: 'Questions' },
  { path: '/questions/unanswered', text: 'Unanswered' },
];

const routeTitles = [
  { path: '/', exact: true, title: 'Questions' },
  { path: '/questions/unanswered', exact: true, title: 'Unanswered' },
  { path: '/question/', title: 'Questions' },
  { path: '/sign-in', exact: true, title: 'Sign in' },
  { path: '/sign-up', exact: true, title: 'Sign up' },
];

const Navigation = ({ classes }) =>
  (
    <div>
      <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }}>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {leftNav.map(({ path, text }) => (
            <ListItem key={path} className={classes.li}>
              <Typography
                component={NavLink}
                activeClassName={classes.activeLink}
                exact
                to={path}
                className={classes.link}
                color="inherit"
                onClick={event => event.target.blur()}
              >
                {text}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="title" color="inherit">
            {routeTitles.map(({ path, title, exact }) => (
              <Route key={path} exact={exact} path={path} render={always(title)} />
            ))}
          </Typography>
          <div>
            <Typography component={Link} to="/sign-in" className={classes.navRight}>Sign in</Typography>
            <Typography component={Link} to="/sign-up" className={classes.navRight}>Sign up</Typography>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
Navigation.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Navigation);
