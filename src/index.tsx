import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {store} from './state/store';
import {Provider} from 'react-redux';
import {ThemeOptions, ThemeProvider} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import createTheme from "@mui/material/styles/createTheme";
import {Security} from "./components/Security";

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#FFA000',
      light: '#FFECB3',
      dark: '#FFA000',
      contrastText: '#212121',
    },
    secondary: {
      main: '#795548',
    },
    divider: '#BDBDBD',
  },
  typography: {
    fontFamily: 'Kalam',
    body1: {
      fontFamily: 'Kalam',
    },
    body2: {
      fontFamily: 'Kalam',
    },
    h1: {
      fontFamily: 'cursive',
      fontWeight: 700
    },
    h6: {
      fontFamily: 'cursive',
      fontWeight: 700
    },
    h5: {
      fontFamily: 'cursive',
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        color: "primary"
      }
    }
  }
};

const customTheme = createTheme(themeOptions);

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline/>
    <Provider store={store}>
      <ThemeProvider theme={customTheme}>
        <Security>
          <App/>
        </Security>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
