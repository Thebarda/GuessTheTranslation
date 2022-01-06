import { atomWithReset, atomWithStorage, RESET } from 'jotai/utils';
import { atom } from 'jotai';

import { Translation } from './models';

export const translationsAtom = atomWithStorage<Array<Translation>>(
  'GuessTheTranslation:translations',
  [],
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

export const editingTranslationAtom = atomWithReset<number | null>(null);

export const startEditingTranslationDerivedAtom = atom(
  null,
  (_, set, { translation, index }) => {
    set(editingTranslationAtom, index);
    set(mainWordAtom, translation.en);
    set(wordsToGuessAtom, translation.fr);
  },
);

export const confirmEditTranslationDerivedAtom = atom(
  null,
  (get, set, newValue: Translation) => {
    set(translationsAtom, [...get(translationsAtom), newValue]);
    set(mainWordAtom, RESET);
    set(wordsToGuessAtom, RESET);
  },
);
