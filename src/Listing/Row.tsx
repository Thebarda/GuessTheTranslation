import * as React from 'react';

import { useAtomValue, useUpdateAtom } from 'jotai/utils';

import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  ListItem,
  ListItemText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { getTranslationDerivedAtom, translationsAtom } from '../atoms';

interface Props {
  index: number;
}

const Row = ({ index }: Props): JSX.Element | null => {
  const [askingBeforeDelete, setAskingBeforeDelete] = React.useState(false);
  const getTranslation = useAtomValue(getTranslationDerivedAtom);
  const setTranslations = useUpdateAtom(translationsAtom);

  const translation = getTranslation(index);

  const askBeforeDelete = (): void => setAskingBeforeDelete(true);

  const closeDialog = (): void => setAskingBeforeDelete(false);

  const deleteTranslation = (): void => {
    setTranslations((translations) =>
      translations.filter((_, i) => i !== index),
    );
    closeDialog();
  };

  if (!translation) {
    return null;
  }

  return (
    <ListItem
      disableGutters
      disablePadding
      secondaryAction={
        <IconButton
          aria-label="delete"
          color="primary"
          size="small"
          onClick={askBeforeDelete}
        >
          <DeleteIcon />
        </IconButton>
      }
      sx={{ height: 72 }}
    >
      <ListItemText
        primary={translation?.en}
        secondary={translation.fr.join(', ')}
      />
      <Dialog open={askingBeforeDelete} onBackdropClick={closeDialog}>
        <DialogTitle>Delete the translation ?</DialogTitle>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button variant="contained" onClick={deleteTranslation}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </ListItem>
  );
};

export default Row;
