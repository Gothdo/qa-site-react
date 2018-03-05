import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Drawer from 'material-ui/Drawer';
import List, { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
import grey from 'material-ui/colors/grey';
import PropTypes from 'prop-types';
import { Route, NavLink } from 'react-router-dom';
import { always } from 'ramda';

const styles = ({ drawerWidth, mixins: { toolbar }, spacing }) => ({
  toolbar,
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
});

const navItems = [
  { path: '/', text: 'Questions' },
  { path: '/questions/unanswered', text: 'Unanswered' },
];

const Navigation = ({ classes }) =>
  (
    <div>
      <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }}>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {navItems.map(({ path, text }) => (
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
        <Toolbar>
          <Typography variant="title" color="inherit">
            {navItems.map(({ path, text }) => (
              <Route key={path} exact path={path} render={always(text)} />
            ))}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
Navigation.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Navigation);
