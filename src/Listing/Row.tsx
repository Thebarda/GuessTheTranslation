import * as React from 'react';

import { useAtomValue } from 'jotai/utils';

import { ListItem, ListItemText } from '@mui/material';

import { getTranslationDerivedAtom } from '../atoms';

interface Props {
  index: number;
}

const Row = ({ index }: Props): JSX.Element | null => {
  const getTranslation = useAtomValue(getTranslationDerivedAtom);

  const translation = getTranslation(index);

  if (!translation) {
    return null;
  }

  return (
    <ListItem disableGutters disablePadding sx={{ height: 72 }}>
      <ListItemText
        primary={translation?.en}
        secondary={translation.fr.join(', ')}
      />
    </ListItem>
  );
};

export default Row;
