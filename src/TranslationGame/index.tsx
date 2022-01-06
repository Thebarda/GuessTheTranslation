import * as React from 'react';

import { useAtomValue } from 'jotai/utils';

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Theme,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import { translationsAtom } from '../atoms';

import Game from './Game';

const useStyles = makeStyles<Theme>((theme) => ({
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'center',
    margin: '0 auto',
    rowGap: theme.spacing(2),
    width: theme.spacing(70),
  },
  gameContent: {
    margin: '0 auto',
    width: theme.spacing(70),
  },
  streakInput: {
    margin: '0 auto',
  },
}));

const TranslationGame = (): JSX.Element => {
  const classes = useStyles();

  const [showGameDialog, setShowGameDialog] = React.useState(false);
  const [streakLength, setStreakLength] = React.useState(1);
  const [gameHasStarted, setGameHasStarted] = React.useState(false);

  const translations = useAtomValue(translationsAtom);

  const openDialog = (): void => setShowGameDialog(true);

  const closeDialog = (): void => {
    setGameHasStarted(false);
    setShowGameDialog(false);
  };

  const changeStreakLength = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setStreakLength(parseInt(e.target.value, 10));
  };

  const startStreak = (): void => setGameHasStarted(true);

  const newGame = (): void => setGameHasStarted(false);

  React.useEffect(() => {
    setStreakLength(translations.length);
  }, [translations]);

  const canStartTheStreak = !!streakLength;

  return (
    <>
      <Button fullWidth variant="contained" onClick={openDialog}>
        Start the game
      </Button>
      <Dialog
        fullScreen
        open={showGameDialog}
        onBackdropClick={closeDialog}
        onClose={closeDialog}
      >
        <DialogTitle sx={{ textAlign: 'center' }}>
          Guess the translation!
        </DialogTitle>
        <DialogContent
          className={classes.dialogContent}
          style={{ paddingTop: '16px' }}
        >
          {gameHasStarted ? (
            <Game
              endGame={closeDialog}
              newGame={newGame}
              streakLength={streakLength}
              translations={translations}
            />
          ) : (
            <>
              <TextField
                className={classes.streakInput}
                label="Streak length"
                type="number"
                value={streakLength || ''}
                onChange={changeStreakLength}
              />
              <Button
                fullWidth
                disabled={!canStartTheStreak}
                variant="contained"
                onClick={startStreak}
              >
                Start the streak
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TranslationGame;
