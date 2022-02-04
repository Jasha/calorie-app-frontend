import useAxios from 'api/useAxios';
import API_ENDPOINTS from 'api/constants';
import { UseAxios } from 'api/types';

interface IRequest {
  user_id: number;
  date: string;
  name: string;
  calorie: number;
}

const useUpdateFood = (): UseAxios<IRequest, unknown> => {
  const [{ data, loading, error }, updateFood] = useAxios(
    {
      url: API_ENDPOINTS.ADMIN_FOOD,
      method: 'PUT',
    },
    {
      manual: true,
    },
  );

  return [{ data, loading, error }, updateFood];
};

export default useUpdateFood;
