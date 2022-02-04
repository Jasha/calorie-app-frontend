import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DoneIcon from '@mui/icons-material/Done';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { SxProps, Theme } from '@mui/material';

interface ISuccessModalProps {
  open: boolean;
  onConfirm: () => void;
}

const SuccessModal: React.FC<ISuccessModalProps> = ({
  open,
  onConfirm,
}: ISuccessModalProps) => (
  <Dialog
    open={open}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogContent sx={style.content}>
      <Avatar sx={style.avatar}>
        <DoneIcon color="success" fontSize="large" />
      </Avatar>
      <Typography component="h1" variant="h5">
        Success!
      </Typography>
      <Typography>Registered successfully</Typography>
      <Button
        fullWidth
        variant="contained"
        sx={style.button}
        onClick={onConfirm}
      >
        Go to login
      </Button>
    </DialogContent>
  </Dialog>
);

const style: { [key: string]: SxProps<Theme> } = {
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    p: 8,
  },
  avatar: {
    m: 1,
    bgcolor: 'transparent',
    borderRadius: '50%',
    border: '2px solid green',
  },
  button: {
    mt: 8,
  },
};

export default SuccessModal;
