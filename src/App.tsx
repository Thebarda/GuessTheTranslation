import * as React from 'react';

import { Container, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import LoadingSkeleton from './LoadingSkeleton';
import ListingSkeleton from './Listing/ListingSkeleton';
import Help from './Help';

const TranslationGame = React.lazy(() => import('./TranslationGame'));
const Listing = React.lazy(() => import('./Listing'));

const useStyles = makeStyles<Theme>((theme) => ({
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
      <Container maxWidth="sm">
        <React.Suspense fallback={<LoadingSkeleton height={36} width="100%" />}>
          <TranslationGame />
        </React.Suspense>
        <React.Suspense fallback={<ListingSkeleton />}>
          <Listing />
        </React.Suspense>
      </Container>
      <Help />
    </div>
  );
};

export default App;
