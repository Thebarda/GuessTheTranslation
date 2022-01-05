import * as React from 'react';

import { useAtom } from 'jotai';

import { FormHelperText, TextField } from '@mui/material';

import { mainWordAtom, mainWordWasFocusedAtom } from '../../atoms';

const MainWordInput = (): JSX.Element => {
  const [mainWordWasFocused, setMainWordWasFocused] = useAtom(
    mainWordWasFocusedAtom,
  );
  const [mainWord, setMainWord] = useAtom(mainWordAtom);

  const changeMainWord = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setMainWord(event.target.value);
  };

  const blur = (): void => setMainWordWasFocused(true);

  const hasError = mainWordWasFocused && !mainWord;

  return (
    <div>
      <TextField
        required
        label="Original word"
        value={mainWord}
        onBlur={blur}
        onChange={changeMainWord}
      />
      {hasError && <FormHelperText error>Required</FormHelperText>}
    </div>
  );
};

export default MainWordInput;
