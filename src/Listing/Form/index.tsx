import * as React from 'react';

import { Divider, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import LoadingSkeleton from '../../LoadingSkeleton';

const MainWordInput = React.lazy(() => import('./MainWordInput'));
const WordsToGuessInputs = React.lazy(() => import('./WordsGuessInputs'));
const AddAnotherTranslation = React.lazy(
  () => import('./AddAnotherTranslation'),
);

const useStyles = makeStyles<Theme>((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: theme.spacing(2),
  },
}));

const Form = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.form}>
      <React.Suspense fallback={<LoadingSkeleton height={56} width="100%" />}>
        <MainWordInput />
      </React.Suspense>
      <Divider />
      <React.Suspense fallback={<LoadingSkeleton height={56} width="100%" />}>
        <WordsToGuessInputs />
      </React.Suspense>
      <React.Suspense fallback={<LoadingSkeleton height={42} width="100%" />}>
        <AddAnotherTranslation />
      </React.Suspense>
    </div>
  );
};

export default Form;
