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

const Navigation = ({ classes }) =>
  (
    <div>
      <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }}>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <ListItem className={classes.li}>
            <Typography component={NavLink} activeClassName={classes.activeLink} exact to="/" className={classes.link} color="inherit">Questions</Typography>
          </ListItem>
          <ListItem className={classes.li}>
            <Typography component={NavLink} activeClassName={classes.activeLink} exact to="/questions/unanswered" className={classes.link} color="inherit">Unanswered</Typography>
          </ListItem>
        </List>
      </Drawer>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="title" color="inherit">
            <Route exact path="/" render={() => 'Questions'} />
            <Route exact path="/questions/unanswered" render={() => 'Unanswered'} />
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
Navigation.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Navigation);
