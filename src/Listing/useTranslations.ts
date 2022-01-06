import * as React from 'react';

import { RESET, useAtomValue, useResetAtom } from 'jotai/utils';
import { useAtom } from 'jotai';
import { useSnackbar } from 'notistack';

import {
  addAnotherTranslationAtom,
  editingTranslationAtom,
  mainWordAtom,
  resetFormDerivedAtom,
  translationsAtom,
  wordsToGuessAtom,
} from '../atoms';
import { Translation } from '../models';

interface UseTranslationsState {
  canSubmit: boolean;
  closeDialog: () => void;
  isEditing: boolean;
  openDialog: () => void;
  showAddDialog: boolean;
  submit: () => void;
  totalTranslations: number;
  translations: Array<Translation>;
}

const useTranslations = (): UseTranslationsState => {
  const [showAddDialog, setShowAddDialog] = React.useState(false);

  const [addAnotherTranslation, setAddAnotherTranslation] = useAtom(
    addAnotherTranslationAtom,
  );
  const [translations, setTranslations] = useAtom(translationsAtom);
  const wordsToGuess = useAtomValue(wordsToGuessAtom);
  const mainWord = useAtomValue(mainWordAtom);
  const editingTranslation = useAtomValue(editingTranslationAtom);
  const resetForm = useResetAtom(resetFormDerivedAtom);
  const resetEditingTranslation = useResetAtom(editingTranslationAtom);

  const { enqueueSnackbar } = useSnackbar();

  const openDialog = React.useCallback((): void => setShowAddDialog(true), []);

  const closeDialog = React.useCallback((): void => {
    setShowAddDialog(false);
  }, []);

  const submit = React.useCallback((): void => {
    if (editingTranslation !== null) {
      setTranslations(
        translations.map((translation, index) => {
          if (index === editingTranslation) {
            return {
              en: mainWord,
              fr: wordsToGuess,
            };
          }

          return translation;
        }),
      );
      enqueueSnackbar('Translation edited', { variant: 'success' });
      setShowAddDialog(false);

      return;
    }
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

    setShowAddDialog(false);
  }, [translations, addAnotherTranslation, mainWord, wordsToGuess]);

  React.useEffect(() => {
    if (editingTranslation === null) {
      return;
    }

    setShowAddDialog(true);
  }, [editingTranslation]);

  React.useEffect(() => {
    if (showAddDialog) {
      return;
    }

    resetForm();
    setShowAddDialog(false);
    setAddAnotherTranslation(RESET);
    if (editingTranslation === null) {
      return;
    }
    resetEditingTranslation();
  }, [showAddDialog]);

  const totalTranslations = translations.length;

  const canSubmit =
    mainWord !== '' &&
    wordsToGuess.length > 0 &&
    wordsToGuess.every((word) => word);

  return {
    canSubmit,
    closeDialog,
    isEditing: editingTranslation !== null,
    openDialog,
    showAddDialog,
    submit,
    totalTranslations,
    translations,
  };
};

export default useTranslations;
