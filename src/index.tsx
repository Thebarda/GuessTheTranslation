import React from 'react';

import { Provider } from 'jotai';
import ReactDOM from 'react-dom';

import { Box, StyledEngineProvider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
