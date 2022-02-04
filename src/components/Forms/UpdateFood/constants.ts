import { addMinutes } from 'date-fns';
import { object, string, number, date } from 'yup';

import { IResponse as IUserFood } from 'api/admin/useGetUserFoodEntries';

interface ICalorieForm {
  user_name: string;
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

export const INITIAL_VALUES = (userFood: IUserFood | null): ICalorieForm => ({
  user_name: userFood?.user_name || '',
  date: userFood ? new Date(userFood.date) : new Date(),
  name: userFood?.name || '',
  calorie: userFood?.calorie || '',
});

export const FORM_CONFIG = [
  {
    name: 'user_name',
    type: 'label',
    label: 'User Name',
  },
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
