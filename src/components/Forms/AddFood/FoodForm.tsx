import React, { useEffect } from 'react';
import { SxProps, Theme } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import { useFormik } from 'formik';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { useSnackbar } from 'notistack';

import useAddFood from 'api/regular/useAddFood';
import getErrorMessage from 'api/helpers';
import FoodAutocomplete from 'components/FoodAutocomplete/FoodAutocomplete';

import { FORM_CONFIG, INITIAL_VALUES, SCHEMA } from './constants';

interface IFoodFormProps {
  onDataAdded: () => void;
}

const FoodForm: React.FC<IFoodFormProps> = ({
  onDataAdded,
}: IFoodFormProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const [{ data, loading, error }, addFood] = useAddFood();

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema: SCHEMA,
    onSubmit: (values) => {
      addFood({
        data: {
          ...values,
          date: new Date(values.date).toISOString(),
          calorie: Number(values.calorie),
        },
      });
    },
  });

  useEffect(() => {
    if (data) {
      onDataAdded();

      formik.resetForm();
      enqueueSnackbar('Successfully added entry.', { variant: 'success' });
    }
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (error) {
      enqueueSnackbar(getErrorMessage(error), { variant: 'error' });
    }
  }, [error]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDateChange = (newValue: Date | null) => {
    formik.setFieldValue('date', newValue);
  };

  const handleInputChange = (newInputValue: string) => {
    formik.setFieldValue('name', newInputValue);
  };

  const handleCalorieFound = (newCalorieValue: number) => {
    formik.setFieldValue('calorie', Math.round(newCalorieValue));
  };

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      noValidate
      autoComplete="off"
      sx={style.form}
    >
      {FORM_CONFIG.map((field) => {
        if (field.type === 'date') {
          return (
            <LocalizationProvider key={field.name} dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(props) => (
                  <TextField
                    {...props}
                    required
                    sx={style.selectorField}
                    error={
                      formik.touched[field.name] &&
                      Boolean(formik.errors[field.name])
                    }
                    helperText={
                      formik.touched[field.name] && formik.errors[field.name]
                    }
                  />
                )}
                label={field.label}
                value={formik.values[field.name]}
                onChange={handleDateChange}
              />
            </LocalizationProvider>
          );
        }

        if (field.type === 'autocomplete') {
          return (
            <FoodAutocomplete
              key={field.name}
              fieldStyle={style.selectorField}
              fieldName={field.name}
              fieldLabel={field.label}
              fieldValue={formik.values.name}
              onInputChange={handleInputChange}
              onCalorieFound={handleCalorieFound}
              error={
                formik.touched[field.name] && Boolean(formik.errors[field.name])
              }
              helperText={
                formik.touched[field.name] && formik.errors[field.name]
              }
            />
          );
        }

        return (
          <TextField
            key={field.name}
            margin="normal"
            required
            fullWidth
            sx={style.field}
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
        );
      })}
      <Button
        type="submit"
        variant="contained"
        size="large"
        sx={style.button}
        endIcon={<SendIcon />}
        disabled={!formik.isValid || loading}
      >
        Add
      </Button>
    </Box>
  );
};

const style: { [key: string]: SxProps<Theme> } = {
  form: {
    display: 'flex',
    alignItems: 'flex-start',
    pb: 8,
    '@media (max-width: 600px)': {
      flexDirection: 'column',
    },
  },
  selectorField: {
    margin: '16px 16px 8px 0',
    width: '100%',
  },
  field: {
    mr: 2,
  },
  button: {
    height: '56px',
    mt: 2,
    '@media (max-width: 600px)': {
      width: '100%',
    },
    '@media (min-width: 601px)': {
      width: '30%',
    },
  },
};

export default FoodForm;
