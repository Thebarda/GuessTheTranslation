import * as React from 'react';

import CelebrationIcon from '@mui/icons-material/Celebration';
import { Button, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles<Theme>((theme) => ({
  buttons: {
    columnGap: theme.spacing(2),
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    rowGap: theme.spacing(2),
  },
}));

interface Props {
  endGame: () => void;
  newGame: () => void;
}

const GameFinished = ({ endGame, newGame }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <CelebrationIcon color="success" fontSize="large" />
      <Typography>Congratulations!</Typography>
      <div className={classes.buttons}>
        <Button onClick={endGame}>End the game</Button>
        <Button variant="contained" onClick={newGame}>
          Start a new game
        </Button>
      </div>
    </div>
  );
};

export default GameFinished;
