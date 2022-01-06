import * as React from 'react';

import { Box } from '@mui/system';

import LoadingSkeleton from '../LoadingSkeleton';

import { itemSize, maxElementsToShow } from '.';

const ListingSkeleton = (): JSX.Element => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateRows: 'auto min-content',
      rowGap: '16px',
    }}
  >
    <LoadingSkeleton height={itemSize * maxElementsToShow} width="100%" />
    <Box sx={{ justifySelf: 'flex-end' }}>
      <LoadingSkeleton height={56} variant="rectangular" width={56} />
    </Box>
  </Box>
);

export default ListingSkeleton;
