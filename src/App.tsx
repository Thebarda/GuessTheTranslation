import * as React from 'react';

import { useAtom } from 'jotai';
import { useAtomValue } from 'jotai/utils';
import { isEmpty, isNil, not } from 'ramda';

import { Container, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import LoadingSkeleton from './LoadingSkeleton';
import ListingSkeleton from './Listing/ListingSkeleton';
import Help from './Footer';
import {
  profileDialogOpenedAtom,
  profilesAtom,
  profileUsedAtom,
} from './atoms';
import AddProfileDialog from './Profiles/AddProfileDialog';
import Profiles from './Profiles';

const TranslationGame = React.lazy(() => import('./TranslationGame'));
const Listing = React.lazy(() => import('./Listing'));

const useStyles = makeStyles<Theme>((theme) => ({
  header: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    justifyItems: 'flex-end',
    [theme.breakpoints.down('lg')]: {
      gridTemplateColumns: '1fr',
      justifyItems: 'center',
    },
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: theme.spacing(3),
  },
}));

const App = (): JSX.Element => {
  const classes = useStyles();

  const [profileDialogOpened, setProfileDialogOpened] = useAtom(
    profileDialogOpenedAtom,
  );
  const profiles = useAtomValue(profilesAtom);
  const profileUsed = useAtomValue(profileUsedAtom);

  React.useEffect(() => {
    if (not(isEmpty(profiles))) {
      return;
    }
    setProfileDialogOpened(true);
  }, []);

  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <Typography align="center" variant="h3">
          Guess the translation!
        </Typography>
        <Profiles />
      </div>
      <Container maxWidth="sm">
        {isNil(profileUsed) || isEmpty(profiles) ? (
          <Typography align="center" variant="h5">
            Please select a profile to start
          </Typography>
        ) : (
          <>
            <React.Suspense
              fallback={<LoadingSkeleton height={36} width="100%" />}
            >
              <TranslationGame />
            </React.Suspense>
            <React.Suspense fallback={<ListingSkeleton />}>
              <Listing />
            </React.Suspense>
          </>
        )}
      </Container>
      <Help />
      <AddProfileDialog open={profileDialogOpened} />
    </div>
  );
};

export default App;
