import React from 'react';
import { SxProps, Theme } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { format } from 'date-fns';

import { IResponse as IFoodEntries } from 'api/regular/useGetFoodEntries';
import DATE_TIME_FORMATS from 'utils/constants';
import useProfile from 'hooks/useProfile';

interface IRecentLogsProps {
  logs: Array<IFoodEntries>;
}

const RecentLogs: React.FC<IRecentLogsProps> = ({ logs }: IRecentLogsProps) => {
  const [profileData] = useProfile();
  const limit = profileData?.calories_threshold || 0;

  const caloriesPerDay = logs.reduce((result, item) => {
    result += item.calorie;
    return result;
  }, 0);

  return (
    <>
      <Typography
        variant="h4"
        align="center"
        sx={{ color: caloriesPerDay > limit ? 'red' : 'green' }}
        gutterBottom
      >
        {caloriesPerDay}
        <Typography component="span" sx={style.limit}>
          /{limit}
        </Typography>
      </Typography>
      <Grid container spacing={1}>
        {logs.map((item) => (
          <Grid
            key={item.id}
            container
            item
            justifyContent="space-around"
            sx={style.foodItem}
          >
            <Grid item>
              {format(new Date(item.date), DATE_TIME_FORMATS.TIME)}
            </Grid>
            <Grid item>{item.name}</Grid>
            <Grid item>{item.calorie}</Grid>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

const style: { [key: string]: SxProps<Theme> } = {
  limit: {
    color: 'black',
    fontSize: '1rem',
  },
  foodItem: {
    textAlign: 'center',
    '& > div': {
      width: '30%',
    },
  },
  link: {
    mt: 3,
  },
};

export default RecentLogs;
