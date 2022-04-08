import * as React from 'react';

import { useUpdateAtom } from 'jotai/utils';
import { isNil } from 'ramda';
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

import {
  profileDataDerivedAtom,
  startEditingTranslationDerivedAtom,
} from '../atoms';
import { Translation } from '../models';

interface Props {
  data: Array<Translation>;
  index: number;
  style: React.CSSProperties;
}

const Row = ({ index, data, style }: Props): JSX.Element | null => {
  const [askingBeforeDelete, setAskingBeforeDelete] = React.useState(false);

  const [profile, setProfile] = useAtom(profileDataDerivedAtom);
  const startEditingTranslation = useUpdateAtom(
    startEditingTranslationDerivedAtom,
  );

  const translation = data[index];

  const askBeforeDelete = (): void => setAskingBeforeDelete(true);

  const closeDialog = (): void => setAskingBeforeDelete(false);

  const editTranslation = (): void => {
    startEditingTranslation({ index, translation });
  };

  const deleteTranslation = (): void => {
    if (isNil(profile)) {
      return;
    }

    setProfile({
      ...profile,
      translations: profile.translations.filter((_, i) => i !== index),
    });
    closeDialog();
  };

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
      sx={style}
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
