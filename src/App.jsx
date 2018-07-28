import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import Navigation from './Navigation';
import Main from './Main';
import { getJWT, JWTProvider } from './JWT';

const theme = createMuiTheme({
  drawerWidth: 240,
  palette: {
    primary: blue,
  },
});

class App extends React.Component {
  state = {
    JWT: getJWT(),
  }

  setJWT = JWT => this.setState({ JWT });

  render() {
    const { JWT } = this.state;
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <JWTProvider value={{ JWT, setJWT: this.setJWT }}>
            <CssBaseline />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Mono|Roboto:300,300i,400,400i,700,700i" />
            <Navigation />
            <Main />
          </JWTProvider>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

export default hot(module)(App);
