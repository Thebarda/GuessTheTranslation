/* eslint-disable react/no-array-index-key */
import * as React from 'react';

import { useAtom } from 'jotai';
import { useAtomValue } from 'jotai/utils';

import { FormHelperText, IconButton, TextField, Theme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@mui/styles';

import {
  profileDataDerivedAtom,
  wordsToGuessAtom,
  wordsToGuessWasFocusedAtom,
} from '../../atoms';
import { getLocaleName } from '../../Profiles/locales';

const useStyles = makeStyles<Theme>((theme) => ({
  translationContainer: {
    alignItems: 'center',
    display: 'grid',
    gridTemplateColumns: 'auto min-content',
  },
  wordsToGuessContainer: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: theme.spacing(2),
  },
}));

interface ChangeWordsToGuessProps {
  index?: number;
  isNewWord?: boolean;
}

const WordsToGuessInputs = (): JSX.Element => {
  const classes = useStyles();

  const [wordsToGuessWasFocused, setWordsToGuessWasFocused] = useAtom(
    wordsToGuessWasFocusedAtom,
  );
  const [wordsToGuess, setWordsToGuess] = useAtom(wordsToGuessAtom);
  const profile = useAtomValue(profileDataDerivedAtom);

  const changeWordsToGuess =
    ({ index, isNewWord }: ChangeWordsToGuessProps) =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      if (isNewWord) {
        const newWordsToGuess = [...(wordsToGuess || []), event.target.value];
        setWordsToGuess(newWordsToGuess);

        return;
      }
      const newWordsToGuess = wordsToGuess.map((word, i) => {
        if (i === index) {
          return event.target.value;
        }

        return word;
      });
      setWordsToGuess(newWordsToGuess);
    };

  const deleteTranslation = (index: number) => (): void => {
    const newWordsToGuess = [...wordsToGuess];
    setWordsToGuess(newWordsToGuess.filter((_, i) => i !== index));
  };

  const blur = (): void => setWordsToGuessWasFocused(true);

  const hasError =
    wordsToGuessWasFocused &&
    (wordsToGuess.length === 0 || wordsToGuess.some((word) => !word));

  return (
    <div className={classes.wordsToGuessContainer}>
      {[...wordsToGuess, null].map((word, index) => {
        const isNewWord = word === null;

        return (
          <div className={classes.translationContainer} key={`word_${index}`}>
            <TextField
              inputProps={{
                'aria-label': `word_${index}`,
              }}
              label={`Translation in ${getLocaleName(
                profile?.language.to || '',
              )}`}
              value={word || ''}
              onBlur={blur}
              onChange={changeWordsToGuess({ index, isNewWord })}
            />
            {!isNewWord && (
              <IconButton color="primary" onClick={deleteTranslation(index)}>
                <DeleteIcon />
              </IconButton>
            )}
          </div>
        );
      })}
      {hasError && <FormHelperText error>Required</FormHelperText>}
    </div>
  );
};

export default WordsToGuessInputs;
