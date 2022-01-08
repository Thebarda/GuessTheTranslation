import React from 'react';

import { Provider } from 'jotai';
import ReactDOM from 'react-dom';
import { SnackbarProvider } from 'notistack';

import { Box, StyledEngineProvider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { register } from './serviceWorkerRegistration';
import App from './App';

const Main = (): JSX.Element => {
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          anchorOrigin={{
            horizontal: 'center',
            vertical: 'bottom',
          }}
          maxSnack={1}
        >
          <Provider>
            <Box
              sx={{
                bgcolor: 'background.default',
                color: 'text.primary',
                height: '100vh',
                margin: 0,
                width: '100%',
              }}
            >
              <App />
            </Box>
          </Provider>
        </SnackbarProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById('root'),
);

register();
