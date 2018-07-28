import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import PropTypes from 'prop-types';
import JWTDecode from 'jwt-decode';
import makeMyInput from './MyInput';
import { withJWT } from './JWT';

const styles = ({ spacing }) => ({
  root: {
    margin: '20px auto',
    maxWidth: 400,
  },
  button: {
    marginTop: spacing.unit * 2,
  },
  error: {
    marginLeft: spacing.unit * -3,
    marginRight: spacing.unit * -3,
    padding: `${spacing.unit * 2}px ${spacing.unit * 3}px`,
    fontSize: '1em',
    backgroundColor: red[700],
    color: 'white',
  },
});

class SignIn extends React.Component {
  MyInput = makeMyInput(this)

  static propTypes = {
    classes: PropTypes.shape().isRequired,
    history: PropTypes.shape().isRequired,
    setJWT: PropTypes.func.isRequired,
  }

  state = {
    form: {
      email: '',
      password: '',
    },
    incorrect: false,
  }

  handleSubmit = async (event) => {
    event.persist();
    event.preventDefault();
    try {
      const { form } = this.state;
      const { setJWT, history } = this.props;
      const { headers } = await axios.post('http://localhost:3000/security/login', form);
      const JWT = headers['x-auth-token'];
      setJWT(JWTDecode(JWT));
      localStorage.setItem('JWT', JWT);
      history.push('/');
    } catch (e) {
      this.setState({ incorrect: true });
    }
  }

  handleChange = (event) => {
    event.persist();
    this.setState(({ form }) => ({ form: { ...form, [event.target.name]: event.target.value } }));
  }

  render() {
    const { classes } = this.props;
    const { MyInput } = this;
    const { incorrect } = this.state;
    return (
      <Card className={classes.root}>
        <CardContent>
          <form spellCheck="false" onSubmit={this.handleSubmit}>
            <Typography variant="headline" gutterBottom>
              Sign up
            </Typography>
            {incorrect && (
              <Typography className={classes.error} gutterBottom>
                The e-mail address or password is incorrect.
              </Typography>
            )}
            <MyInput name="email" type="email" autoComplete="email" label="E-mail address" />
            <MyInput name="password" type="password" autoComplete="current-password" label="Password" inputProps={{ minLength: 6 }} />
            <Button type="submit" variant="raised" color="primary" className={classes.button}>
              Sign in
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }
}

export default withJWT(withStyles(styles)(SignIn));
