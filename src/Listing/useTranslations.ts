import * as React from 'react';

import { RESET, useAtomValue, useResetAtom } from 'jotai/utils';
import { useAtom } from 'jotai';
import { useSnackbar } from 'notistack';

import {
  addAnotherTranslationAtom,
  mainWordAtom,
  resetFormDerivedAtom,
  translationsAtom,
  wordsToGuessAtom,
} from '../atoms';

interface UseTranslationsState {
  canSubmit: boolean;
  closeDialog: () => void;
  openDialog: () => void;
  showAddDialog: boolean;
  submit: () => void;
  totalTranslations: number;
}

const useTranslations = (): UseTranslationsState => {
  const [showAddDialog, setShowAddDialog] = React.useState(false);

  const [addAnotherTranslation, setAddAnotherTranslation] = useAtom(
    addAnotherTranslationAtom,
  );
  const [translations, setTranslations] = useAtom(translationsAtom);
  const wordsToGuess = useAtomValue(wordsToGuessAtom);
  const mainWord = useAtomValue(mainWordAtom);
  const resetForm = useResetAtom(resetFormDerivedAtom);

  const { enqueueSnackbar } = useSnackbar();

  const openDialog = React.useCallback((): void => setShowAddDialog(true), []);

  const closeDialog = React.useCallback((): void => {
    resetForm();
    setShowAddDialog(false);
    setAddAnotherTranslation(RESET);
  }, []);

  const submit = React.useCallback((): void => {
    setTranslations([
      ...translations,
      {
        en: mainWord,
        fr: wordsToGuess,
      },
    ]);

    enqueueSnackbar('Translation added', { variant: 'success' });

    if (addAnotherTranslation) {
      resetForm();

      return;
    }
    resetForm();
    setShowAddDialog(false);
  }, [translations, addAnotherTranslation]);

  const totalTranslations = translations.length;

  const canSubmit =
    mainWord !== '' &&
    wordsToGuess.length > 0 &&
    wordsToGuess.every((word) => word);

  return {
    canSubmit,
    closeDialog,
    openDialog,
    showAddDialog,
    submit,
    totalTranslations,
  };
};

export default useTranslations;
