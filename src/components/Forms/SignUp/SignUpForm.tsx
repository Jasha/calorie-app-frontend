import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import useRegister from 'api/common/useRegister';
import getErrorMessage from 'api/helpers';
import ROUTES from 'routes/constants';

import { FORM_CONFIG, INITIAL_VALUES, SCHEMA } from './constants';
import SuccessModal from './SuccessModal';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const [{ data, loading, error }, register] = useRegister();

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema: SCHEMA,
    onSubmit: (values) => {
      register({ data: values });
    },
  });

  useEffect(() => {
    if (data) {
      setIsOpen(true);
      formik.resetForm();
    }
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSuccessConfirm = () => {
    navigate(ROUTES.LOGIN);
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={formik.handleSubmit}
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
          autoComplete={field.autoComplete}
          name={field.name}
          required
          fullWidth
          id={field.name}
          label={field.label}
          type={field.type || 'text'}
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
        disabled={!formik.isValid || loading}
        sx={style.button}
      >
        Sign Up
      </Button>
      <SuccessModal open={isOpen} onConfirm={handleSuccessConfirm} />
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

export default SignUp;
