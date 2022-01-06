import * as React from 'react';

import { Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import LoadingSkeleton from './LoadingSkeleton';
import ListingSkeleton from './Listing/ListingSkeleton';

const TranslationGame = React.lazy(() => import('./TranslationGame'));
const Listing = React.lazy(() => import('./Listing'));

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
        <React.Suspense fallback={<LoadingSkeleton height={36} width="100%" />}>
          <TranslationGame />
        </React.Suspense>
        <React.Suspense fallback={<ListingSkeleton />}>
          <Listing />
        </React.Suspense>
      </div>
    </div>
  );
};

export default App;
