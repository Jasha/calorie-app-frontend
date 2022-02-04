import React, { useEffect } from 'react';
import { SxProps, Theme } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import { useFormik } from 'formik';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { useSnackbar } from 'notistack';

import useUpdateFood from 'api/admin/useUpdateFood';
import getErrorMessage from 'api/helpers';
import FoodAutocomplete from 'components/FoodAutocomplete/FoodAutocomplete';
import { IResponse as IUserFood } from 'api/admin/useGetUserFoodEntries';

import { FORM_CONFIG, INITIAL_VALUES, SCHEMA } from './constants';
import API_ENDPOINTS from 'api/constants';

interface IUpdatedFoodFormProps {
  userFood: IUserFood | null;
  onCancel: () => void;
  onDataUpdated: () => void;
}

const UpdateFoodForm: React.FC<IUpdatedFoodFormProps> = ({
  userFood,
  onCancel,
  onDataUpdated,
}: IUpdatedFoodFormProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const [{ data, loading, error }, updateFood] = useUpdateFood();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: INITIAL_VALUES(userFood),
    validationSchema: SCHEMA,
    onSubmit: (values) => {
      if (!userFood) return;

      updateFood({
        url: `${API_ENDPOINTS.ADMIN_FOOD}${userFood.id}/`,
        data: {
          ...values,
          user_id: userFood.user,
          date: new Date(values.date).toISOString(),
          calorie: Number(values.calorie),
        },
      });
    },
  });

  useEffect(() => {
    if (data) {
      formik.resetForm();
      onDataUpdated();
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
        if (field.type === 'label') {
          return <FormLabel>{formik.values[field.name]}</FormLabel>;
        }

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
      <Box sx={style.actions}>
        <Button type="button" sx={style.button} onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={style.button}
          disabled={!formik.isValid || loading}
        >
          Update
        </Button>
      </Box>
    </Box>
  );
};

const style: { [key: string]: SxProps<Theme> } = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  selectorField: {
    margin: '16px 16px 8px 0',
    width: '100%',
  },
  field: {
    mr: 2,
  },
  actions: {
    width: '100%',
  },
  button: {
    height: '56px',
    mt: 2,
    width: '50%',
  },
};

export default UpdateFoodForm;
