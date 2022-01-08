import * as React from 'react';

import { Fab, Theme, Tooltip, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

const useStyles = makeStyles<Theme>((theme) => ({
  fab: {
    bottom: theme.spacing(4),
    position: 'absolute',
    right: theme.spacing(4),
  },
}));

const HelpContent = (): JSX.Element => (
  <div>
    <Typography variant="body2">
      Welcome to the Guess the translation game
    </Typography>
    <br />
    <Typography variant="body2">
      The goal of this game is to guess the translation of a word through a
      series of word (streak).
    </Typography>
    <br />
    <Typography variant="body2">
      Firstly, add some words to your dictionary by clicking on the
      &ldquo;+&ldquo; button.
    </Typography>
    <Typography variant="body2">
      Then, click on the &ldquo;Start the game&ldquo; button to configure the
      length of the streak and start the game.
    </Typography>
  </div>
);

const Help: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <Tooltip placement="top-start" title={<HelpContent />}>
      <Fab className={classes.fab}>
        <QuestionMarkIcon />
      </Fab>
    </Tooltip>
  );
};

export default Help;
