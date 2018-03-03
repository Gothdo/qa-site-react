import React from 'react';
import { render } from 'react-dom';
import Reboot from 'material-ui/Reboot';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import Navigation from './Navigation';
import Main from './Main';

const theme = createMuiTheme({
  drawerWidth: 240,
});

render(
  <MuiThemeProvider theme={theme}>
    <Reboot />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
    <Navigation />
    <Main />
  </MuiThemeProvider>,
  document.getElementById('app'),
);
