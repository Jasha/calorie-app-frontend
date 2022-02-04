import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import useLogin from 'api/common/useLogin';
import getErrorMessage from 'api/helpers';
import { setUser } from 'utils/userService';
import ROUTES from 'routes/constants';

import { FORM_CONFIG, INITIAL_VALUES, SCHEMA } from './constants';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const [{ data, loading, error }, login] = useLogin();

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema: SCHEMA,
    onSubmit: (values) => {
      login({ data: values });
    },
  });

  useEffect(() => {
    if (data) {
      setUser(data);
      navigate(data.is_superuser ? ROUTES.REPORT : ROUTES.HOME, {
        replace: true,
      });
    }
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      noValidate
      autoComplete="off"
      sx={style.form}
    >
      {error && (
        <Alert severity="error" sx={style.alert}>
          {getErrorMessage(error)}
        </Alert>
      )}
      {FORM_CONFIG.map((field) => (
        <TextField
          key={field.name}
          margin="normal"
          required
          fullWidth
          id={field.name}
          label={field.label}
          name={field.name}
          type={field.type || 'text'}
          autoComplete={field.autoComplete}
          autoFocus={field.autoFocus}
          value={formik.values[field.name]}
          onChange={formik.handleChange}
          error={
            formik.touched[field.name] && Boolean(formik.errors[field.name])
          }
          helperText={formik.touched[field.name] && formik.errors[field.name]}
        />
      ))}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={style.button}
        disabled={!formik.isValid || loading}
      >
        Login
      </Button>
    </Box>
  );
};

const style = {
  form: {
    mt: 1,
  },
  alert: {
    mt: 3,
    mb: 2,
    width: '100%',
  },
  button: {
    mt: 3,
    mb: 2,
  },
} as const;

export default LoginForm;
