import * as React from 'react';

import { useAtom } from 'jotai';

import { Checkbox, FormControlLabel } from '@mui/material';

import { addAnotherTranslationAtom } from '../../atoms';

const AddAnotherTranslation = (): JSX.Element => {
  const [addAnotherTranslation, setAddAnotherTranslation] = useAtom(
    addAnotherTranslationAtom,
  );

  const change = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setAddAnotherTranslation(event.target.checked);
  };

  return (
    <FormControlLabel
      control={<Checkbox checked={addAnotherTranslation} onChange={change} />}
      label="Add another translation"
    />
  );
};

export default AddAnotherTranslation;
