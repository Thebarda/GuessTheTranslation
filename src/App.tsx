import * as React from 'react';

import { Typography } from '@mui/material';

import Listing from './Listing';

const App = (): JSX.Element => (
  <>
    <Typography align="center" variant="h3">
      Guess the translation!
    </Typography>
    <Listing />
  </>
);

export default App;
