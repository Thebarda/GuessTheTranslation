import * as React from 'react';

import { Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import Listing from './Listing';
import TranslationGame from './TranslationGame';

const useStyles = makeStyles<Theme>((theme) => ({
  content: {
    margin: '0 auto',
    width: theme.spacing(70),
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: theme.spacing(3),
  },
}));

const App = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Typography align="center" variant="h3">
        Guess the translation!
      </Typography>
      <div className={classes.content}>
        <TranslationGame />
        <Listing />
      </div>
    </div>
  );
};

export default App;
