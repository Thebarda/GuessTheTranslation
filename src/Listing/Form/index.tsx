import * as React from 'react';

import { Divider, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import MainWordInput from './MainWordInput';
import WordsToGuessInputs from './WordsGuessInputs';
import AddAnotherTranslation from './AddAnotherTranslation';

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
      <MainWordInput />
      <Divider />
      <WordsToGuessInputs />
      <AddAnotherTranslation />
    </div>
  );
};

export default Form;
