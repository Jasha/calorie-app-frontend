import useAxios from 'api/useAxios';
import API_ENDPOINTS from 'api/constants';
import { UseAxios } from 'api/types';

interface IRequest {
  username: string;
  password: string;
}

interface IResponse {
  token: string;
  is_superuser: boolean;
}

const useLogin = (): UseAxios<IRequest, IResponse> => {
  const [{ data, loading, error }, login] = useAxios(
    {
      url: API_ENDPOINTS.LOGIN,
      method: 'POST',
    },
    {
      manual: true,
    },
  );

  return [{ data, loading, error }, login];
};

export default useLogin;
