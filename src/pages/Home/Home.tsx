import React, { useEffect, useState } from 'react';
import { SxProps, Theme } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import { addDays } from 'date-fns';

import useGetFoodEntries, {
  IResponse as IFoodEntries,
} from 'api/regular/useGetFoodEntries';
import getErrorMessage from 'api/helpers';
import AppBar from 'components/AppBar/AppBar';
import FoodForm from 'components/Forms/AddFood/FoodForm';
import RecentLogs from 'components/RecentLogs/RecentLogs';
import LogsNavigator from 'components/LogsNavigator/LogsNavigator';

const Home: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [date, setDate] = useState(new Date());
  const [recentLogs, setRecentLogs] = useState<Array<IFoodEntries>>([]);

  const [{ data, error }, getFood] = useGetFoodEntries();

  const getFoodForCurrentDate = () => {
    const fromDate = new Date(date);
    fromDate.setHours(0, 0, 0, 0);

    const toDate = new Date(date);
    toDate.setHours(23, 59, 59, 999);

    getFood({
      params: {
        from_date: fromDate.toISOString(),
        to_date: toDate.toISOString(),
      },
    });
  };

  useEffect(() => {
    if (date) {
      getFoodForCurrentDate();
    }
  }, [date]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (data) {
      setRecentLogs([...data]);
    }
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (error) {
      enqueueSnackbar(getErrorMessage(error), { variant: 'error' });
    }
  }, [error]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDataAdded = () => {
    getFoodForCurrentDate();
  };

  const handleLeftClick = () => {
    setDate(addDays(date, -1));
  };

  const handleRightClick = () => {
    setDate(addDays(date, 1));
  };

  return (
    <>
      <AppBar />
      <Container maxWidth="md" component="main" sx={style.container}>
        <Typography variant="h2" align="center" gutterBottom>
          Calorie App
        </Typography>
        <FoodForm onDataAdded={handleDataAdded} />
        <LogsNavigator
          date={date}
          onLeftClick={handleLeftClick}
          onRightClick={handleRightClick}
        />
        <RecentLogs logs={recentLogs} />
      </Container>
    </>
  );
};

const style: { [key: string]: SxProps<Theme> } = {
  container: {
    pt: 8,
    pb: 6,
  },
};

export default Home;
