import { atomWithReset, atomWithStorage, RESET } from 'jotai/utils';
import { atom } from 'jotai';
import { isNil } from 'ramda';

import { Profile, Profiles, Translation } from './models';

export const profilesAtom = atomWithStorage<Profiles>(
  'GuessTheTranslation:profiles',
  {},
);

export const profileUsedAtom = atomWithStorage<string | null>(
  'GuessTheTranslation:profileUsed',
  null,
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
    const profileUsed = get(profileUsedAtom);
    const profile = profileUsed ? get(profilesAtom)[profileUsed] : null;

    if (isNil(profile)) {
      return;
    }

    set(profilesAtom, {
      ...get(profilesAtom),
      [profileUsed as string]: {
        ...profile,
        translations: [...profile.translations, newValue],
      },
    });
    set(mainWordAtom, RESET);
    set(wordsToGuessAtom, RESET);
  },
);

export const profileDataDerivedAtom = atom(
  (get) => {
    const profileUsed = get(profileUsedAtom);

    return profileUsed ? get(profilesAtom)[profileUsed] : null;
  },
  (get, set, newProfile: Profile) => {
    const profileUsed = get(profileUsedAtom);
    const profile = profileUsed ? get(profilesAtom)[profileUsed] : null;

    if (isNil(profile)) {
      return;
    }

    set(profilesAtom, {
      ...get(profilesAtom),
      [profileUsed as string]: newProfile,
    });
  },
);

export const profileDialogOpenedAtom = atom<boolean>(false);
