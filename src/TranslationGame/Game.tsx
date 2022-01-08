import * as React from 'react';

import { useSnackbar } from 'notistack';
import { diffChars } from 'diff';

import { Button, TextField, Typography } from '@mui/material';

import { CompareTranslationResult, Translation } from '../models';

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

interface CompareWordsProps {
  answer: string;
  translation: string;
}

interface Diff {
  added: string;
  count: number;
  removed: string;
}

const compareWords = ({
  answer,
  translation,
}: CompareWordsProps): CompareTranslationResult => {
  if (answer === translation) {
    return CompareTranslationResult.Equal;
  }

  const differences = diffChars(answer, translation);

  const numberOfDifferences = differences.reduce(
    (acc: number, diff: Diff) =>
      acc + (diff.added || diff.removed ? diff.count : 0),
    0,
  );

  return numberOfDifferences > 2
    ? CompareTranslationResult.Different
    : CompareTranslationResult.AlmostEqual;
};

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

  const checkAnswer = React.useCallback((): CompareTranslationResult => {
    const translation = translationsLeft[selectedTranslationIndex];

    const comparisonResults = translation.fr.map((word) =>
      compareWords({
        answer: guessAnswer.toLowerCase(),
        translation: word.toLowerCase(),
      }),
    );

    return comparisonResults.sort()[0];
  }, [guessAnswer, translationsLeft, selectedTranslationIndex]);

  const goToNextWord = React.useCallback((): void => {
    const result = checkAnswer();

    if (result === CompareTranslationResult.AlmostEqual) {
      enqueueSnackbar('You are almost there', { variant: 'warning' });

      return;
    }
    if (result === CompareTranslationResult.Different) {
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

  const nextLabel = currentStep === streakLength ? 'End streak' : 'Next word';

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
        {nextLabel}
      </Button>
    </>
  );
};

export default Game;
