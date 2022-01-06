import * as React from 'react';

import { useUpdateAtom } from 'jotai/utils';
import { useAtom } from 'jotai';

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
import EditIcon from '@mui/icons-material/Edit';

import { startEditingTranslationDerivedAtom, translationsAtom } from '../atoms';

interface Props {
  index: number;
}

const Row = ({ index }: Props): JSX.Element | null => {
  const [askingBeforeDelete, setAskingBeforeDelete] = React.useState(false);
  const [translations, setTranslations] = useAtom(translationsAtom);
  const startEditingTranslation = useUpdateAtom(
    startEditingTranslationDerivedAtom,
  );

  const translation = translations[index];

  const askBeforeDelete = (): void => setAskingBeforeDelete(true);

  const closeDialog = (): void => setAskingBeforeDelete(false);

  const editTranslation = (): void => {
    startEditingTranslation({ index, translation });
  };

  const deleteTranslation = (): void => {
    setTranslations((currentTranslations) =>
      currentTranslations.filter((_, i) => i !== index),
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
        <>
          <IconButton
            aria-label="edit"
            color="primary"
            size="small"
            onClick={editTranslation}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            color="primary"
            size="small"
            onClick={askBeforeDelete}
          >
            <DeleteIcon />
          </IconButton>
        </>
      }
      sx={{ height: 72 }}
    >
      <ListItemText
        primary={translation?.en}
        secondary={translation.fr.join(', ')}
      />
      <Dialog open={askingBeforeDelete} onBackdropClick={closeDialog}>
        <DialogTitle>Delete the translation?</DialogTitle>
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
