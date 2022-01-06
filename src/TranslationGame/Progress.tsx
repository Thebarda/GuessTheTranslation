import * as React from 'react';

import { LinearProgress, Typography, Box } from '@mui/material';

interface Props {
  maxSteps: number;
  step: number;
}

const Progress = ({ step, maxSteps }: Props): JSX.Element => {
  const progressValue = (step / maxSteps) * 100;

  return (
    <Box sx={{ alignItems: 'center', display: 'flex' }}>
      <Box sx={{ mr: 1, width: '100%' }}>
        <LinearProgress value={progressValue} variant="determinate" />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography color="text.secondary" variant="body2">
          {step}/{maxSteps}
        </Typography>
      </Box>
    </Box>
  );
};

export default Progress;
