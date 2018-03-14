import React from 'react';
import { render } from 'react-dom';
import Reboot from 'material-ui/Reboot';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './Navigation';
import Main from './Main';

const theme = createMuiTheme({
  drawerWidth: 240,
});

render(
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <Reboot />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Mono|Roboto:300,300i,400,400i,700,700i" />
      <Navigation />
      <Main />
    </MuiThemeProvider>
  </BrowserRouter>,
  document.getElementById('app'),
);
