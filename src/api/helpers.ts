import { AxiosError } from 'axios';

const getErrorMessage = (error: AxiosError): string => {
  if (!error.response?.data)
    return 'Error while executing request. Please check network tab for details.';

  const { data } = error.response;

  if (data.non_field_errors) return data.non_field_errors[0];

  const fieldKey = Object.keys(data)[0];
  return `${fieldKey.toUpperCase()}: ${data[fieldKey]}`;
};

export default getErrorMessage;
