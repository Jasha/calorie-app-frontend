import React, { ChangeEvent, useEffect, useState } from 'react';
import { SxProps, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';

import useGetUserFoodEntries, {
  IResponse as IUserFood,
} from 'api/admin/useGetUserFoodEntries';
import useDeleteFood from 'api/admin/useDeleteFood';
import DeleteConfirmationModal from 'components/UserFoodLogs/DeleteConfirmationModal';
import getErrorMessage from 'api/helpers';
import API_ENDPOINTS from 'api/constants';
import LogsTable from 'components/UserFoodLogs/LogsTable';
import UpdateModal from 'components/UserFoodLogs/UpdateModal';

const PAGE_SIZE = 6;

const UserFoodLogs: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [page, setPage] = useState(1);

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [updatingEntry, setUpdatingEntry] = useState<IUserFood | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(0);

  const [{ data }, getEntries] = useGetUserFoodEntries();
  const [{ response: deleteResponse, error: deleteError }, deleteFood] =
    useDeleteFood();

  const getEntriesPage = () => {
    getEntries({ params: { page, page_size: PAGE_SIZE } });
  };

  const closeUpdateModal = () => {
    setUpdatingEntry(null);
    setIsUpdateOpen(false);
  };

  const closeDeleteModal = () => {
    setDeletingId(0);
    setIsDeleteOpen(false);
  };

  useEffect(() => {
    getEntriesPage();
  }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (deleteResponse) {
      closeDeleteModal();
      getEntriesPage();
      enqueueSnackbar('Successfully deleted.', { variant: 'success' });
    }
  }, [deleteResponse]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (deleteError) {
      enqueueSnackbar(getErrorMessage(deleteError), { variant: 'error' });
    }
  }, [deleteError]); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePageChange = (event: ChangeEvent<unknown>, newValue: number) => {
    setPage(newValue);
  };

  const handleDeleteClick = (id: number) => () => {
    setDeletingId(id);
    setIsDeleteOpen(true);
  };

  const handleUpdateClick = (entry: IUserFood) => () => {
    setUpdatingEntry(entry);
    setIsUpdateOpen(true);
  };

  const handleCloseUpdate = () => {
    closeUpdateModal();
  };

  const handleDeleteCancel = () => {
    closeDeleteModal();
  };

  const handleUpdated = () => {
    closeUpdateModal();
    getEntriesPage();
    enqueueSnackbar('Successfully updated.', { variant: 'success' });
  };

  const handleDeleteConfirm = () => {
    deleteFood({ url: `${API_ENDPOINTS.ADMIN_FOOD}${deletingId}/` });
  };

  return (
    <Box sx={style.list}>
      <Typography variant="h6" color="primary" gutterBottom>
        Recent logs
      </Typography>
      <LogsTable
        rows={data?.results || []}
        onUpdate={handleUpdateClick}
        onDelete={handleDeleteClick}
      />
      <Pagination
        sx={style.pagination}
        count={data ? Math.ceil(data.count / PAGE_SIZE) : 0}
        page={page}
        onChange={handlePageChange}
        showFirstButton
        showLastButton
      />
      <UpdateModal
        open={isUpdateOpen}
        userFood={updatingEntry}
        onClose={handleCloseUpdate}
        onUpdated={handleUpdated}
      />
      <DeleteConfirmationModal
        open={isDeleteOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </Box>
  );
};

const style: { [key: string]: SxProps<Theme> } = {
  list: {
    pt: 6,
    width: '100%',
  },
  table: {
    width: '100%',
  },
  pagination: {
    mt: 3,
    '& > ul': {
      justifyContent: 'center',
    },
  },
};

export default UserFoodLogs;
