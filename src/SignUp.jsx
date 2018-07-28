import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import JWTDecode from 'jwt-decode';
import makeMyInput from './MyInput';
import { messages } from './Message';
import { withJWT } from './JWT';

const styles = theme => ({
  root: {
    margin: '20px auto',
    maxWidth: 400,
  },
  button: {
    marginTop: theme.spacing.unit * 2,
  },
});

class SignUp extends React.Component {
  MyInput = makeMyInput(this)

  errors = {
    ERROR_EMAIL_IN_USE: {
      input: 'email',
      message: 'This e-mail address is already taken.',
    },
    ERROR_DISPLAYNAME_IN_USE: {
      input: 'displayName',
      message: 'This name is already taken.',
    },
  }

  static propTypes = {
    classes: PropTypes.shape().isRequired,
    history: PropTypes.shape().isRequired,
    onMessage: PropTypes.func.isRequired,
    setJWT: PropTypes.func.isRequired,
  }

  state = {
    form: {
      email: '',
      displayName: '',
      password: '',
    },
  }

  handleSubmit = async (event) => {
    event.persist();
    event.preventDefault();
    const { form } = this.state;
    const { setJWT, history, onMessage } = this.props;
    try {
      await axios.post('http://localhost:3000/user/register', form);
      const { headers } = await axios.post(
        'http://localhost:3000/security/login',
        R.dissoc('displayName', form),
      );
      const JWT = headers['x-auth-token'];
      setJWT(JWTDecode(JWT));
      localStorage.setItem('JWT', JWT);
      history.push('/');
      onMessage(messages.accountCreated);
    } catch (axiosError) {
      const errorName = R.path(['response', 'data', 'error'], axiosError);
      if (errorName) {
        const { input, message } = this.errors[errorName];
        event.target.elements[input].setCustomValidity(message);
      }
      event.target.reportValidity();
    }
  }

  handleChange = (event) => {
    event.persist();
    this.setState(({ form }) => ({ form: { ...form, [event.target.name]: event.target.value } }));
    event.target.setCustomValidity('');
  }

  render() {
    const { classes } = this.props;
    const { MyInput } = this;
    return (
      <Card className={classes.root}>
        <CardContent>
          <form spellCheck="false" onSubmit={this.handleSubmit}>
            <Typography variant="headline" gutterBottom>
              Sign up
            </Typography>
            <MyInput name="email" type="email" autoComplete="email" label="E-mail address" />
            <MyInput name="displayName" autoComplete="username" label="Display name" />
            <MyInput name="password" type="password" autoComplete="new-password" label="Password" inputProps={{ minLength: 6 }} />
            <Button type="submit" variant="raised" color="primary" className={classes.button}>
              Sign up
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }
}

export default withJWT(withStyles(styles)(SignUp));
