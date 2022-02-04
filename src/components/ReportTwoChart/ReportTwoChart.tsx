import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { BarChart, Tooltip, CartesianGrid, YAxis, XAxis, Bar } from 'recharts';

import useGetReportTwo from 'api/admin/useGetReportTwo';
import { SxProps, Theme } from '@mui/material';

interface IChartData {
  name: string;
  value: number;
}

const Report: React.FC = () => {
  const [chartData, setChartData] = useState<Array<IChartData>>([]);

  const [{ data: reportData }] = useGetReportTwo();

  useEffect(() => {
    if (reportData) {
      setChartData([
        ...reportData.map((item) => ({
          name: item.name,
          value: item.average_calories,
        })),
      ]);
    }
  }, [reportData]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box sx={style.container}>
      <BarChart
        width={600}
        height={200}
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
      <Typography align="center">
        The average number of calories added per user for the last 7 days
      </Typography>
    </Box>
  );
};

const style: { [key: string]: SxProps<Theme> } = {
  container: {
    display: 'inline-block',
    maxWidth: '600px',
    '& > div': {
      display: 'inline-block',
    },
  },
};

export default Report;
