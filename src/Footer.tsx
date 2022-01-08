import * as React from 'react';

import { Button, Fab, Theme, Tooltip, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import GitHubIcon from '@mui/icons-material/GitHub';
import BugReportIcon from '@mui/icons-material/BugReport';

const useStyles = makeStyles<Theme>((theme) => ({
  fab: {
    alignItems: 'center',
    bottom: theme.spacing(3),
    columnGap: theme.spacing(1),
    display: 'flex',
    position: 'absolute',
    right: theme.spacing(3),
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
      Firstly, add some words (basically a main word and translations) to your
      dictionary by clicking on the &ldquo;+&ldquo; button.
    </Typography>
    <Typography variant="body2">
      Then, click on the &ldquo;Start the game&ldquo; button to configure the
      length of the streak and start the game.
    </Typography>
  </div>
);

const Footer: React.FunctionComponent = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const toggleTooltip = (): void => setOpen((currentOpen) => !currentOpen);

  return (
    <div className={classes.fab}>
      <Button
        aria-label="Source code"
        href="https://github.com/Thebarda/GuessTheTranslation"
        rel="noopener noreferrer"
        startIcon={<GitHubIcon />}
        target="_blank"
      >
        Source code
      </Button>
      <Button
        aria-label="Report issue"
        href="https://github.com/Thebarda/GuessTheTranslation/issues"
        rel="noopener noreferrer"
        startIcon={<BugReportIcon />}
        target="_blank"
      >
        Report issue
      </Button>
      <Tooltip open={open} placement="top-start" title={<HelpContent />}>
        <Fab
          aria-label="help"
          onMouseEnter={toggleTooltip}
          onMouseLeave={toggleTooltip}
          onTouchStart={toggleTooltip}
        >
          <QuestionMarkIcon />
        </Fab>
      </Tooltip>
    </div>
  );
};

export default Footer;
