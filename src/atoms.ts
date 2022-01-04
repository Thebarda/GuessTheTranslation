import { atomWithReset, atomWithStorage } from 'jotai/utils';
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
