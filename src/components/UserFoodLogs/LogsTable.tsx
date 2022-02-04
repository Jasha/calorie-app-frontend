import React from 'react';
import { SxProps, Theme } from '@mui/material';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';

import DATE_TIME_FORMATS from 'utils/constants';
import { IResponse as IUserFood } from 'api/admin/useGetUserFoodEntries';

interface ILogsTableProps {
  rows: Array<IUserFood>;
  onUpdate: (entry: IUserFood) => () => void;
  onDelete: (id: number) => () => void;
}

const LogsTable: React.FC<ILogsTableProps> = ({
  rows,
  onUpdate,
  onDelete,
}: ILogsTableProps) => (
  <Table size="small" sx={style.table}>
    <TableHead>
      <TableRow>
        <TableCell>Date</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Food</TableCell>
        <TableCell align="right">Calorie</TableCell>
        <TableCell align="center">Actions</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((row) => (
        <TableRow key={row.id}>
          <TableCell>
            {format(new Date(row.date), DATE_TIME_FORMATS.DATE_TIME)}
          </TableCell>
          <TableCell>{row.user_name}</TableCell>
          <TableCell>{row.name}</TableCell>
          <TableCell align="right">{row.calorie}</TableCell>
          <TableCell align="center">
            <IconButton color="primary" onClick={onUpdate(row)}>
              <EditIcon />
            </IconButton>
            <IconButton color="error" onClick={onDelete(row.id)}>
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const style: { [key: string]: SxProps<Theme> } = {
  table: {
    width: '100%',
  },
};

export default LogsTable;
