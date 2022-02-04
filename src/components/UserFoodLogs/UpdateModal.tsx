import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';

import UpdateFoodForm from 'components/Forms/UpdateFood/UpdateFoodForm';
import { IResponse as IUserFood } from 'api/admin/useGetUserFoodEntries';

interface IUpdateModalProps {
  open: boolean;
  userFood: IUserFood | null;
  onClose: () => void;
  onUpdated: () => void;
}

const UpdateModal: React.FC<IUpdateModalProps> = ({
  open,
  userFood,
  onClose,
  onUpdated,
}: IUpdateModalProps) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Update</DialogTitle>
    <DialogContent>
      <UpdateFoodForm
        userFood={userFood}
        onCancel={onClose}
        onDataUpdated={onUpdated}
      />
    </DialogContent>
  </Dialog>
);

export default UpdateModal;
