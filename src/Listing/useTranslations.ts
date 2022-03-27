import * as React from 'react';

import { RESET, useAtomValue, useResetAtom } from 'jotai/utils';
import { useAtom } from 'jotai';
import { useSnackbar } from 'notistack';
import { equals, isNil } from 'ramda';

import {
  addAnotherTranslationAtom,
  editingTranslationAtom,
  mainWordAtom,
  resetFormDerivedAtom,
  wordsToGuessAtom,
  profileDataDerivedAtom,
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
  const [profile, setProfile] = useAtom(profileDataDerivedAtom);
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
    if (isNil(profile)) {
      return;
    }

    if (editingTranslation !== null) {
      setProfile({
        ...profile,
        translations: profile.translations.map((translation, index) => {
          if (equals(index, editingTranslation)) {
            return {
              en: mainWord,
              fr: wordsToGuess,
            };
          }

          return translation;
        }),
      });
      enqueueSnackbar('Translation edited', { variant: 'success' });
      setShowAddDialog(false);

      return;
    }
    setProfile({
      ...profile,
      translations: [
        ...profile.translations,
        {
          en: mainWord,
          fr: wordsToGuess,
        },
      ],
    });

    enqueueSnackbar('Translation added', { variant: 'success' });

    if (addAnotherTranslation) {
      resetForm();

      return;
    }

    setShowAddDialog(false);
  }, [profile, addAnotherTranslation, mainWord, wordsToGuess]);

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

  const totalTranslations = profile?.translations.length || 0;

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
    translations: profile?.translations || [],
  };
};

export default useTranslations;
