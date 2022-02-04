import { object, string } from 'yup';

interface ILoginForm {
  username: string;
  password: string;

  [key: string]: string;
}

export const SCHEMA = object().shape({
  username: string().email('Enter a valid email').required('Email is required'),
  password: string().required('Password is required'),
});

export const INITIAL_VALUES: ILoginForm = { username: '', password: '' };

export const FORM_CONFIG = [
  {
    name: 'username',
    label: 'Email',
    autoComplete: 'username',
    autoFocus: true,
  },
  {
    name: 'password',
    label: 'Password',
    autoComplete: 'current-password',
    type: 'password',
  },
];
