import { object, string } from 'yup';

interface ISignUpForm {
  name: string;
  email: string;
  password: string;

  [key: string]: string;
}

export const SCHEMA = object().shape({
  name: string().trim().required('Name is required'),
  email: string()
    .trim()
    .email('Enter a valid email')
    .required('Email is required'),
  password: string().trim().required('Password is required'),
});

export const INITIAL_VALUES: ISignUpForm = {
  name: '',
  email: '',
  password: '',
};

export const FORM_CONFIG = [
  {
    name: 'name',
    autoFocus: true,
    label: 'Name',
    autoComplete: 'full-name',
  },
  {
    name: 'email',
    label: 'Email',
    autoComplete: 'email',
  },
  {
    name: 'password',
    label: 'Password',
    autoComplete: 'new-password',
    type: 'password',
  },
];
