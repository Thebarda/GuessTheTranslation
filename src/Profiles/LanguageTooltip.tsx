import * as React from 'react';

import { Stack, Typography } from '@mui/material';

import { Language } from '../models';

import { getLocaleName } from './locales';

interface Props {
  language: Language;
}

const LanguageTooltip = ({ language }: Props): JSX.Element => {
  return (
    <Stack spacing={1}>
      <Typography>Languages</Typography>
      <Typography variant="body2">
        From: {getLocaleName(language.from)}
      </Typography>
      <Typography variant="body2">To: {getLocaleName(language.to)}</Typography>
    </Stack>
  );
};

export default LanguageTooltip;
