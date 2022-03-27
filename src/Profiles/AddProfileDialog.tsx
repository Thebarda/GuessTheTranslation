import * as React from 'react';

import { isEmpty, isNil, keys, not } from 'ramda';
import { useUpdateAtom } from 'jotai/utils';
import { useSnackbar } from 'notistack';
import { useAtom } from 'jotai';

import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import {
  profileDialogOpenedAtom,
  profilesAtom,
  profileUsedAtom,
} from '../atoms';

import { locales } from './locales';

interface Props {
  open: boolean;
}

interface Locale {
  name: string;
  shortCode: string;
}

const AddProfileDialog = ({ open }: Props): JSX.Element => {
  const [profileName, setProfileName] = React.useState<string>('');
  const [languageFrom, setLanguageFrom] = React.useState<Locale | null>(null);
  const [languageTo, setLanguageTo] = React.useState<Locale | null>(null);

  const [profileUsed, setProfileUsed] = useAtom(profileUsedAtom);
  const [profiles, setProfiles] = useAtom(profilesAtom);
  const setProfileDialogOpened = useUpdateAtom(profileDialogOpenedAtom);

  const { enqueueSnackbar } = useSnackbar();

  const changeName = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setProfileName(e.target.value.trim());

  const changeLanguageFrom = (
    _: React.SyntheticEvent,
    locale: Locale | null,
  ): void => setLanguageFrom(locale);

  const changeLanguageTo = (
    _: React.SyntheticEvent,
    locale: Locale | null,
  ): void => setLanguageTo(locale);

  const close = (): void => setProfileDialogOpened(false);

  const submit = (): void => {
    setProfiles((currentProfiles) => ({
      ...currentProfiles,
      [profileName]: {
        language: {
          from: (languageFrom as Locale).shortCode,
          to: (languageTo as Locale).shortCode,
        },
        name: profileName,
        translations: [],
      },
    }));
    close();
    enqueueSnackbar('Profile added', { variant: 'success' });

    if (not(isNil(profileUsed)) && not(isEmpty(profiles))) {
      return;
    }

    setProfileUsed(profileName);
  };

  const profileNameAlreadyExists = keys(profiles).includes(profileName);

  const submitDisabled =
    !profileName || !languageFrom || !languageTo || profileNameAlreadyExists;

  const options = React.useMemo(
    () =>
      keys(locales).map((key) => ({
        name: locales[key],
        shortCode: key,
      })),
    [],
  );

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onBackdropClick={close}
      onClose={close}
    >
      <DialogTitle>Add a profile</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <TextField
            fullWidth
            required
            label="Name"
            value={profileName}
            onChange={changeName}
          />
          <Divider />
          <Typography>Languages</Typography>
          <Autocomplete<Locale>
            getOptionLabel={(option): string => option.name}
            options={options}
            renderInput={(params): JSX.Element => (
              <TextField {...params} fullWidth required label="From" />
            )}
            value={languageFrom}
            onChange={changeLanguageFrom}
          />
          <Autocomplete
            getOptionLabel={(option): string => option.name}
            options={options}
            renderInput={(params): JSX.Element => (
              <TextField {...params} fullWidth required label="To" />
            )}
            value={languageTo}
            onChange={changeLanguageTo}
          />
          {profileNameAlreadyExists && (
            <FormHelperText error>Profile name already exists</FormHelperText>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button disabled={submitDisabled} variant="contained" onClick={submit}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProfileDialog;
