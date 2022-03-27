import * as React from 'react';

import { FixedSizeList } from 'react-window';

import { Box, Button, Dialog, DialogTitle, Fab, Theme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import makeStyles from '@mui/styles/makeStyles';

import { Translation } from '../models';

import Row from './Row';
import Form from './Form';
import useTranslations from './useTranslations';

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
    rowGap: theme.spacing(2),
    width: '100%',
  },
}));

export const itemSize = 72;
export const maxElementsToShow = 10;

const Listing = (): JSX.Element => {
  const classes = useStyles();

  const {
    totalTranslations,
    openDialog,
    closeDialog,
    showAddDialog,
    canSubmit,
    submit,
    isEditing,
    translations,
  } = useTranslations();

  return (
    <>
      <Box className={classes.listingContainer}>
        <FixedSizeList<Array<Translation>>
          height={
            (totalTranslations < 10
              ? totalTranslations * itemSize
              : maxElementsToShow * itemSize) + 1
          }
          itemCount={totalTranslations}
          itemData={translations}
          itemKey={(index, data): string => `${index}-${data[index].en}`}
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
      {showAddDialog && (
        <Dialog
          fullWidth
          open
          classes={{
            paper: classes.dialog,
          }}
          maxWidth="xs"
          onBackdropClick={closeDialog}
          onClose={closeDialog}
        >
          <DialogTitle>{isEditing ? 'Edit' : 'Add'} a translation</DialogTitle>
          <Form isEditing={isEditing} />
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
      )}
    </>
  );
};

export default Listing;
