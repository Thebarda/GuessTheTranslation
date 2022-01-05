import * as React from 'react';

import { RESET, useAtomValue, useResetAtom } from 'jotai/utils';
import { FixedSizeList } from 'react-window';
import { useAtom } from 'jotai';

import { Box, Button, Dialog, DialogTitle, Fab, Theme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import makeStyles from '@mui/styles/makeStyles';

import {
  addAnotherTranslationAtom,
  mainWordAtom,
  resetFormDerivedAtom,
  translationsAtom,
  wordsToGuessAtom,
} from '../atoms';

import Row from './Row';
import Form from './Form';

const useStyles = makeStyles<Theme>((theme) => ({
  actionButtons: {
    columnGap: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-end',
  },
  dialog: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2, 3),
    rowGap: theme.spacing(2),
  },
  fab: {
    justifySelf: 'flex-end',
  },
  listingContainer: {
    display: 'grid',
    gridTemplateRows: 'auto min-content',
    margin: '0 auto',
    width: theme.spacing(70),
  },
}));

const itemSize = 72;
const maxElementsToShow = 10;

const Listing = (): JSX.Element => {
  const classes = useStyles();

  const [showAddDialog, setShowAddDialog] = React.useState(false);

  const [addAnotherTranslation, setAddAnotherTranslation] = useAtom(
    addAnotherTranslationAtom,
  );
  const [translations, setTranslations] = useAtom(translationsAtom);
  const wordsToGuess = useAtomValue(wordsToGuessAtom);
  const mainWord = useAtomValue(mainWordAtom);
  const resetForm = useResetAtom(resetFormDerivedAtom);

  const openDialog = (): void => setShowAddDialog(true);

  const closeDialog = (): void => {
    resetForm();
    setShowAddDialog(false);
    setAddAnotherTranslation(RESET);
  };

  const submit = (): void => {
    setTranslations([
      ...translations,
      {
        en: mainWord,
        fr: wordsToGuess,
      },
    ]);
    if (addAnotherTranslation) {
      resetForm();

      return;
    }
    resetForm();
    setShowAddDialog(false);
  };

  const totalTranslations = translations.length;

  const canSubmit =
    mainWord && wordsToGuess.length > 0 && wordsToGuess.every((word) => word);

  return (
    <>
      <Box className={classes.listingContainer}>
        <FixedSizeList
          height={
            totalTranslations < 10
              ? totalTranslations * itemSize
              : maxElementsToShow * itemSize
          }
          itemCount={translations.length}
          itemSize={72}
          overscanCount={5}
          width="100%"
        >
          {Row}
        </FixedSizeList>
        <Fab
          aria-label="add"
          className={classes.fab}
          color="primary"
          onClick={openDialog}
        >
          <AddIcon />
        </Fab>
      </Box>
      <Dialog
        classes={{
          paper: classes.dialog,
        }}
        open={showAddDialog}
        onBackdropClick={closeDialog}
        onClose={closeDialog}
      >
        <DialogTitle>Add a translation</DialogTitle>
        <Form />
        <div className={classes.actionButtons}>
          <Button color="primary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button
            color="primary"
            disabled={!canSubmit}
            variant="contained"
            onClick={submit}
          >
            Confirm
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default Listing;
