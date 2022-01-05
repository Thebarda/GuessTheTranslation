import { atomWithReset, atomWithStorage, RESET } from 'jotai/utils';
import { atom } from 'jotai';

import { Translation } from './models';

export const translationsAtom = atomWithStorage<Array<Translation>>(
  'GuessTheTranslation:translations',
  [],
);

export const getTranslationDerivedAtom = atom(
  (get) =>
    (index: number): Translation | undefined =>
      get(translationsAtom).at(index),
);

export const mainWordAtom = atomWithReset<string>('');
export const wordsToGuessAtom = atomWithReset<Array<string>>([]);
export const mainWordWasFocusedAtom = atomWithReset<boolean>(false);
export const wordsToGuessWasFocusedAtom = atomWithReset<boolean>(false);
export const addAnotherTranslationAtom = atomWithReset<boolean>(false);

export const resetFormDerivedAtom = atom(
  null,
  (_, set, newValue: number | typeof RESET): void => {
    if (newValue !== RESET) {
      return;
    }
    set(mainWordAtom, newValue);
    set(wordsToGuessAtom, newValue);
    set(mainWordWasFocusedAtom, newValue);
    set(wordsToGuessWasFocusedAtom, newValue);
  },
);
