import * as React from 'react';

import { useAtom } from 'jotai';

import { FormHelperText, TextField } from '@mui/material';

import { mainWordAtom } from '../../atoms';

const MainWordInput = (): JSX.Element => {
  const [wasFocus, setWasFocus] = React.useState(false);
  const [mainWord, setMainWord] = useAtom(mainWordAtom);

  const changeMainWord = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setMainWord(event.target.value);
  };

  const blur = (): void => setWasFocus(true);

  const hasError = wasFocus && !mainWord;

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
