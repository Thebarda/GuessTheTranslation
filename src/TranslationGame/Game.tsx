import * as React from 'react';

import { useSnackbar } from 'notistack';

import { Button, TextField, Typography } from '@mui/material';

import { Translation } from '../models';

import Progress from './Progress';
import GameFinished from './GameFinished';

interface Props {
  endGame: () => void;
  newGame: () => void;
  streakLength: number;
  translations: Array<Translation>;
}

const pickRandonIndex = (length: number): number =>
  Math.floor(Math.random() * length);

const Game = ({
  streakLength,
  translations,
  endGame,
  newGame,
}: Props): JSX.Element => {
  const [currentStep, setCurremtStep] = React.useState(1);
  const [translationsLeft, setTranslationsLeft] = React.useState(translations);
  const [selectedTranslationIndex, setSelectedTranslationIndex] =
    React.useState(pickRandonIndex(translations.length));
  const [guessAnswer, setGuessAnwser] = React.useState('');
  const [isGameFinished, setIsGameFinished] = React.useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const changeGuessAnswer = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setGuessAnwser(e.target.value);

  const resetGuessAnswer = (): void => setGuessAnwser('');

  const checkAnswer = React.useCallback((): boolean => {
    const translation = translationsLeft[selectedTranslationIndex];

    return translation.fr
      .map((word) => word.toLowerCase())
      .includes(guessAnswer.toLowerCase());
  }, [guessAnswer, translationsLeft, selectedTranslationIndex]);

  const goToNextWord = React.useCallback((): void => {
    if (!checkAnswer()) {
      enqueueSnackbar('Wrong answer!', { variant: 'error' });

      return;
    }
    enqueueSnackbar('Correct answer!', { variant: 'success' });
    setCurremtStep((step) => step + 1);
  }, [guessAnswer, translationsLeft, selectedTranslationIndex]);

  const onEnterPressed = (e: React.KeyboardEvent): void => {
    if (e.key !== 'Enter') {
      return;
    }
    goToNextWord();
  };

  React.useEffect(() => {
    if (currentStep === 1) {
      return;
    }
    const newTranslationsLeft = translationsLeft.filter(
      (_, i) => i !== selectedTranslationIndex,
    );
    if (currentStep > streakLength) {
      setIsGameFinished(true);

      return;
    }
    setTranslationsLeft(newTranslationsLeft);
    setSelectedTranslationIndex(pickRandonIndex(newTranslationsLeft.length));
    resetGuessAnswer();
  }, [currentStep]);

  const canGoToNextWord = currentStep <= streakLength && guessAnswer !== '';

  const selectedWord = isGameFinished
    ? null
    : translationsLeft[selectedTranslationIndex];

  return isGameFinished ? (
    <GameFinished endGame={endGame} newGame={newGame} />
  ) : (
    <>
      <Progress maxSteps={streakLength} step={currentStep} />
      <Typography align="center" variant="body1">
        Guess the translation of the word:
      </Typography>
      <Typography align="center" variant="h5">
        {selectedWord?.en}
      </Typography>
      <TextField
        label="Your translation"
        value={guessAnswer}
        onChange={changeGuessAnswer}
        onKeyUp={onEnterPressed}
      />
      <Button
        disabled={!canGoToNextWord}
        variant="contained"
        onClick={goToNextWord}
      >
        Next word
      </Button>
    </>
  );
};

export default Game;
