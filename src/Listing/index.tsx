import * as React from 'react';

import { FixedSizeList } from 'react-window';

import { Box, Button, Dialog, DialogTitle, Theme } from '@mui/material';
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
    marginTop: theme.spacing(1),
    rowGap: theme.spacing(2),
    width: '100%',
  },
}));

export const itemSize = 72;
export const maxElementsToShow = 7;

const Listing = (): JSX.Element => {
  const classes = useStyles();

  const [windowHeight, setWindowHeight] = React.useState(window.innerHeight);

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

  React.useEffect(() => {
    window.addEventListener('resize', () =>
      setWindowHeight(window.innerHeight),
    );
  }, []);

  return (
    <>
      <Box className={classes.listingContainer}>
        <FixedSizeList<Array<Translation>>
          height={Math.floor(windowHeight - 320)}
          itemCount={totalTranslations}
          itemData={translations}
          itemSize={72}
          overscanCount={5}
          width="100%"
        >
          {Row}
        </FixedSizeList>
        <Button
          fullWidth
          className={classes.fab}
          startIcon={<AddIcon />}
          onClick={openDialog}
        >
          Add a word
        </Button>
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
