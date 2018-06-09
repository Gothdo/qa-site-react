import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Route } from 'react-router-dom';
import { always } from 'ramda';
import blue from '@material-ui/core/colors/blue';
import blueGrey from '@material-ui/core/colors/blueGrey';
import QuestionList from './QuestionList';
import Question from './Question';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Profile from './Profile';
import Message, { messages as allMessages } from './Message';

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
      '@media (min-width: 600px)': {
        padding: '16px 24px',
        margin: '0 -24px',
      },
    },
  },
  root: {
    marginLeft: `calc(${theme.drawerWidth}px + 100vw - 100%)`,
  },
  toolbar: theme.mixins.toolbar,
});
class Main extends React.Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
  }
  state = {
    message: null,
  }
  onMessage = text => this.setState(({ message: text }));
  onClose = () => this.setState({ message: null });
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.root}>
        <div className={classes.toolbar} />
        <Route exact path="/" render={always(<QuestionList />)} />
        <Route exact path="/questions/unanswered" render={always(<QuestionList unansweredOnly />)} />
        <Route path="/question/:id" render={({ match }) => <Question id={match.params.id} />} />
        <Route exact path="/sign-up" render={({ history }) => <SignUp history={history} onMessage={this.onMessage} />} />
        <Route exact path="/sign-in" render={({ history }) => <SignIn history={history} onMessage={this.onMessage} />} />
        <Route path="/user/:id/profile" render={({ match }) => <Profile match={match} />} />
        {Object.entries(allMessages).map(([key, text]) => (
          <Message
            open={this.state.message === text}
            key={key}
            text={text}
            onClose={this.onClose}
          />
        ))}
      </main>
    );
  }
}
export default withStyles(styles)(Main);
