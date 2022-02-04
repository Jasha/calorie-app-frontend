import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';

import SignUpForm from 'components/Forms/SignUp/SignUpForm';
import { getUser } from 'utils/userService';
import ROUTES from 'routes/constants';

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = getUser();
    if (user) {
      navigate(user.is_superuser ? ROUTES.REPORT : ROUTES.HOME, {
        replace: true,
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSignInClick = () => {
    navigate(ROUTES.LOGIN);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={style.content}>
        <Avatar sx={style.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <SignUpForm />
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link variant="body2" onClick={handleSignInClick}>
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

const style = {
  content: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    m: 1,
    bgcolor: 'secondary.main',
  },
} as const;

export default SignUp;
