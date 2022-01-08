import * as React from 'react';

import { useAtomValue } from 'jotai/utils';

import {
  Button,
  Container,
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
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'center',
    rowGap: theme.spacing(2),
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
    setShowGameDialog(false);
    setGameHasStarted(false);
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

  const canStartGame = translations.length > 0;

  return (
    <>
      <Button
        fullWidth
        disabled={!canStartGame}
        variant="contained"
        onClick={openDialog}
      >
        Start the game
      </Button>
      {showGameDialog && (
        <Dialog
          fullScreen
          open
          onBackdropClick={closeDialog}
          onClose={closeDialog}
        >
          <DialogTitle sx={{ textAlign: 'center' }}>
            Guess the translation!
          </DialogTitle>
          <DialogContent style={{ paddingTop: '16px' }}>
            <Container className={classes.dialogContent} maxWidth="sm">
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
                  <Button fullWidth onClick={closeDialog}>
                    Exit
                  </Button>
                </>
              )}
            </Container>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default TranslationGame;
