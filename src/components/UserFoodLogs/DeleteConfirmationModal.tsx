import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

interface IDeleteConfirmationModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmationModal: React.FC<IDeleteConfirmationModalProps> = ({
  open,
  onConfirm,
  onCancel,
}: IDeleteConfirmationModalProps) => (
  <Dialog
    open={open}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle>Delete entry</DialogTitle>
    <DialogContent dividers>
      <DialogContentText>
        Are you sure you want delete the entry? This action cannot be undone.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={onCancel}>
        Cancel
      </Button>
      <Button variant="contained" color="error" onClick={onConfirm}>
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);

export default DeleteConfirmationModal;
