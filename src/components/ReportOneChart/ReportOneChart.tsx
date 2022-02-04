import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

import useGetReportOne from 'api/admin/useGetReportOne';
import { SxProps, Theme } from '@mui/material';

interface IChartData {
  name: string;
  value: number;
}

const ReportOneChart: React.FC = () => {
  // const [chartData, setChartData] = useState<Array<IChartData>>([]);

  const [{ data: reportData }] = useGetReportOne();

  const chartData = reportData
    ? [
        {
          name: 'Last 7 day',
          value: reportData.last_week_entries,
        },
        {
          name: 'Week before',
          value: reportData.previous_week_entries,
        },
      ]
    : [];

  // useEffect(() => {
  //   if (reportData) {
  //     setChartData([
  //       {
  //         name: 'Last 7 day',
  //         value: reportData.last_week_entries,
  //       },
  //       {
  //         name: 'Week before',
  //         value: reportData.previous_week_entries,
  //       },
  //     ]);
  //   }
  // }, [reportData]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box sx={style.container}>
      <PieChart width={200} height={200}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          dataKey="value"
          label
        >
          <Cell fill="#8884d8" />
          <Cell fill="#82ca9d" />
        </Pie>
        <Tooltip />
      </PieChart>
      <Typography align="center">
        Number of added entries in the last 7 days vs. added entries the week
        before
      </Typography>
    </Box>
  );
};

const style: { [key: string]: SxProps<Theme> } = {
  container: {
    display: 'inline-block',
    maxWidth: '200px',
    '& > div': {
      display: 'inline-block',
    },
  },
};

export default ReportOneChart;
