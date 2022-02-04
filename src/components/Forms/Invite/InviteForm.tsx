import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';

import useInviteFriend from 'api/regular/useInviteFriend';
import getErrorMessage from 'api/helpers';

import { FORM_CONFIG, INITIAL_VALUES, SCHEMA } from './constants';

interface IInviteFormProps {
  onDone: () => void;
}

const InviteForm: React.FC<IInviteFormProps> = ({
  onDone,
}: IInviteFormProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const [{ data, loading, error }, invite] = useInviteFriend();

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema: SCHEMA,
    onSubmit: (values) => {
      invite({ data: values });
    },
  });

  useEffect(() => {
    if (data) {
      enqueueSnackbar('Friend successfully invited.', { variant: 'success' });
      onDone();
      formik.resetForm();
    }
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

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
          autoFocus={field.autoFocus}
          value={formik.values[field.name]}
          onChange={formik.handleChange}
          error={
            formik.touched[field.name] && Boolean(formik.errors[field.name])
          }
          helperText={formik.touched[field.name] && formik.errors[field.name]}
        />
      ))}
      <Box sx={style.actions}>
        <Button type="button" sx={style.button} onClick={onDone}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={!formik.isValid || loading}
          sx={style.button}
        >
          Invite
        </Button>
      </Box>
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
  actions: {
    textAlign: 'right',
  },
  button: {
    mt: 3,
    mb: 2,
  },
} as const;

export default InviteForm;
