import React from 'react';
import { SxProps, Theme } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import LeftIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import RightIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { format, isToday, isYesterday } from 'date-fns';

import DATE_TIME_FORMATS from 'utils/constants';

interface ILogsNavigatorProps {
  date: Date;
  onLeftClick: () => void;
  onRightClick: () => void;
}

const LogsNavigator: React.FC<ILogsNavigatorProps> = ({
  date,
  onLeftClick,
  onRightClick,
}: ILogsNavigatorProps) => {
  const getNavigatorLabel = () => {
    if (isToday(date)) {
      return 'Today';
    } else if (isYesterday(date)) {
      return 'Yesterday';
    } else {
      return format(date, DATE_TIME_FORMATS.DATE);
    }
  };

  return (
    <Grid container sx={style.navigator}>
      <Grid item>
        <IconButton
          aria-label="previous-day"
          color="primary"
          onClick={onLeftClick}
        >
          <LeftIcon fontSize="large" />
        </IconButton>
      </Grid>
      <Grid item>
        <Typography variant="h6" color="primary" gutterBottom>
          {getNavigatorLabel()}
        </Typography>
      </Grid>
      <Grid item>
        <IconButton
          color="primary"
          aria-label="next-day"
          disabled={isToday(date)}
          onClick={onRightClick}
        >
          <RightIcon fontSize="large" />
        </IconButton>
      </Grid>
    </Grid>
  );
};

const style: { [key: string]: SxProps<Theme> } = {
  navigator: {
    justifyContent: 'space-between',
    alignItems: 'center',
    pb: 1,
  },
};

export default LogsNavigator;
