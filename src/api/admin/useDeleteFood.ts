import useAxios from 'api/useAxios';
import API_ENDPOINTS from 'api/constants';
import { UseAxios } from 'api/types';

interface IRequest {
  id: number;
}

const useDeleteFood = (): UseAxios<IRequest, unknown> => {
  const [{ response, data, loading, error }, deleteFood] = useAxios(
    {
      url: API_ENDPOINTS.ADMIN_FOOD,
      method: 'DELETE',
    },
    {
      manual: true,
    },
  );

  return [{ response, data, loading, error }, deleteFood];
};

export default useDeleteFood;
