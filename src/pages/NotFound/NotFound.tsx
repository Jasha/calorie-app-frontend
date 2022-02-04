import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

import { getUser } from 'utils/userService';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleClickHome = () => {
    const user = getUser();

    let newRoute = '';
    if (!user) {
      newRoute = '/login';
    } else if (user.is_superuser) {
      newRoute = '/report';
    } else {
      newRoute = '/';
    }

    navigate(newRoute, { replace: true });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={style.content}>
        <Typography variant="h1" sx={style.title}>
          404
        </Typography>
        <Typography variant="h4">Page Not Found</Typography>
        <Button variant="contained" sx={style.button} onClick={handleClickHome}>
          Go to home
        </Button>
      </Box>
    </Container>
  );
};

const style = {
  title: {
    fontSize: '12rem',
    fontWeight: 700,
    lineHeight: '90%',
  },
  content: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    mt: 12,
  },
} as const;

export default NotFound;
