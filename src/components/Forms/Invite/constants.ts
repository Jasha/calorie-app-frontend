import { object, string } from 'yup';

interface IInviteForm {
  name: string;
  email: string;

  [key: string]: string;
}

export const SCHEMA = object().shape({
  name: string().trim().required('Name is required'),
  email: string()
    .trim()
    .email('Enter a valid email')
    .required('Email is required'),
});

export const INITIAL_VALUES: IInviteForm = {
  name: '',
  email: '',
};

export const FORM_CONFIG = [
  {
    name: 'name',
    autoFocus: true,
    label: 'Name',
    autoComplete: 'friend-name',
  },
  {
    name: 'email',
    label: 'Email',
    autoComplete: 'friend-email',
  },
];
