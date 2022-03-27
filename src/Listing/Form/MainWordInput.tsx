import * as React from 'react';

import { useAtom } from 'jotai';
import { useAtomValue } from 'jotai/utils';

import { FormHelperText, TextField } from '@mui/material';

import {
  mainWordAtom,
  mainWordWasFocusedAtom,
  profileDataDerivedAtom,
} from '../../atoms';
import { getLocaleName } from '../../Profiles/locales';

const MainWordInput = (): JSX.Element => {
  const [mainWordWasFocused, setMainWordWasFocused] = useAtom(
    mainWordWasFocusedAtom,
  );
  const [mainWord, setMainWord] = useAtom(mainWordAtom);
  const profile = useAtomValue(profileDataDerivedAtom);

  const changeMainWord = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setMainWord(event.target.value);
  };

  const blur = (): void => setMainWordWasFocused(true);

  const hasError = mainWordWasFocused && !mainWord;

  return (
    <div>
      <TextField
        fullWidth
        required
        label={`Original word in ${getLocaleName(
          profile?.language.from || '',
        )}`}
        value={mainWord}
        onBlur={blur}
        onChange={changeMainWord}
      />
      {hasError && <FormHelperText error>Required</FormHelperText>}
    </div>
  );
};

export default MainWordInput;
