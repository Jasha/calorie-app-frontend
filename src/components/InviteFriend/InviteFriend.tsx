import React, { useState } from 'react';
import Button from '@mui/material/Button';

import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import InviteForm from 'components/Forms/Invite/InviteForm';

const InviteFriend: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleInvite = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button sx={style.button} onClick={handleInvite}>
        + Invite friend
      </Button>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Invite your friend</DialogTitle>
        <DialogContent>
          <InviteForm onDone={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
};

const style = {
  button: {
    color: 'green',
    textTransform: 'none',
    fontWeight: 'bold',
  },
};

export default InviteFriend;
