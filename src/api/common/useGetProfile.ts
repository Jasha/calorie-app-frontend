import useAxios from 'api/useAxios';
import API_ENDPOINTS from 'api/constants';
import { UseAxios } from 'api/types';

export interface IResponse {
  name: string;
  is_superuser: boolean;
  calories_threshold: number;
}

const useGetProfile = (): UseAxios<unknown, IResponse> => {
  const [{ data, loading, error }, getProfile] = useAxios(
    {
      url: API_ENDPOINTS.PROFILE,
      method: 'GET',
    },
    {
      manual: true,
    },
  );

  return [{ data, loading, error }, getProfile];
};

export default useGetProfile;
