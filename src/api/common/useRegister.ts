import useAxios from 'api/useAxios';
import API_ENDPOINTS from 'api/constants';
import { UseAxios } from 'api/types';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

const useRegister = (): UseAxios<IRequest, unknown> => {
  const [{ data, loading, error }, register] = useAxios(
    {
      url: API_ENDPOINTS.REGISTER,
      method: 'POST',
    },
    {
      manual: true,
    },
  );

  return [{ data, loading, error }, register];
};

export default useRegister;
