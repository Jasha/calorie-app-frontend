import { addMinutes } from 'date-fns';
import { object, string, number, date } from 'yup';

interface ICalorieForm {
  date: Date;
  name: string;
  calorie: number | '';

  [key: string]: Date | string | number;
}

export const SCHEMA = object().shape({
  date: date()
    .max(addMinutes(new Date(), 5), 'Date cannot be in future')
    .required('Date is required'),
  name: string().trim().required('Name is required'),
  calorie: number()
    .min(0, 'Calorie cannot be negative number')
    .integer('Calorie should be whole number')
    .required('Calorie is required'),
});

export const INITIAL_VALUES: ICalorieForm = {
  date: new Date(),
  name: '',
  calorie: '',
};

export const FORM_CONFIG = [
  {
    name: 'date',
    label: 'Date',
    autoComplete: 'entry-date',
    type: 'date',
  },
  {
    name: 'name',
    label: 'Name',
    autoComplete: 'food-name',
    autoFocus: true,
    type: 'autocomplete',
  },
  {
    name: 'calorie',
    label: 'Calorie',
    autoComplete: 'food-calorie',
    type: 'number',
  },
];
