import * as React from 'react';

import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import { equals, map, values } from 'ramda';
import { useAtom } from 'jotai';

import {
  Button,
  Menu,
  MenuItem,
  Stack,
  Theme,
  Tooltip,
  Typography,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { makeStyles } from '@mui/styles';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import {
  profileDialogOpenedAtom,
  profilesAtom,
  profileUsedAtom,
} from '../atoms';

import LanguageTooltip from './LanguageTooltip';

const useStyles = makeStyles<Theme>((theme) => ({
  profiles: {
    margin: theme.spacing(2, 4, 0, 0),
  },
}));

const Profiles = (): JSX.Element | null => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);

  const [profileUsed, setProfileUsed] = useAtom(profileUsedAtom);
  const profiles = useAtomValue(profilesAtom);
  const setOpenProfileDialog = useUpdateAtom(profileDialogOpenedAtom);

  const open = Boolean(anchorEl);

  const openMenu = (event: React.MouseEvent): void => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = (): void => {
    setAnchorEl(null);
  };

  const switchProfile = (profile: string): void => {
    setProfileUsed(profile);
  };

  const openDialog = (): void => {
    setOpenProfileDialog(true);
  };

  return (
    <div className={classes.profiles}>
      <Stack direction="row" spacing={3}>
        <Tooltip title={profileUsed ? 'Switch profile' : 'Choose a profile'}>
          <Button size="large" startIcon={<PersonIcon />} onClick={openMenu}>
            {profileUsed || 'Choose a profile'}
          </Button>
        </Tooltip>
        <Button startIcon={<PersonAddIcon />} onClick={openDialog}>
          Add a profile
        </Button>
      </Stack>
      <Menu anchorEl={anchorEl} open={open} onClose={closeMenu}>
        {map(
          ({ name, language }) => (
            <MenuItem
              key={name}
              selected={equals(name, profileUsed)}
              onClick={(): void => switchProfile(name)}
            >
              <Tooltip
                placement="right"
                title={<LanguageTooltip language={language} />}
              >
                <Typography>{name}</Typography>
              </Tooltip>
            </MenuItem>
          ),
          values(profiles),
        )}
      </Menu>
    </div>
  );
};

export default Profiles;
