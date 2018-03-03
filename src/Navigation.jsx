import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
import PropTypes from 'prop-types';

const styles = ({ drawerWidth, mixins: { toolbar } }) => ({
  toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  appBar: {
    backgroundColor: blue[500],
    left: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
  },
});

const Navigation = ({ classes }) =>
  (
    <div>
      <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }}>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <ListItem button>
            <ListItemText primary="Questions" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Unanswered" />
          </ListItem>
        </List>
      </Drawer>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="title" color="inherit">
            Questions
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
Navigation.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Navigation);
