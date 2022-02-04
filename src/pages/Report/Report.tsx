import React from 'react';
import { SxProps, Theme } from '@mui/material';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import AppBar from 'components/AppBar/AppBar';
import ReportOneChart from 'components/ReportOneChart/ReportOneChart';
import ReportTwoChart from 'components/ReportTwoChart/ReportTwoChart';
import UserFoodLogs from 'components/UserFoodLogs/UserFoodLogs';

const Report: React.FC = () => (
  <>
    <AppBar />
    <Container maxWidth="md" component="main" sx={style.container}>
      <Box sx={style.content}>
        <ReportOneChart />
        <ReportTwoChart />
        <UserFoodLogs />
      </Box>
    </Container>
  </>
);

const style: { [key: string]: SxProps<Theme> } = {
  container: {
    pt: 6,
    pb: 6,
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
};

export default Report;
