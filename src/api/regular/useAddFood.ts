import useAxios from 'api/useAxios';
import API_ENDPOINTS from 'api/constants';
import { UseAxios } from 'api/types';

interface IRequest {
  date: string;
  name: string;
  calorie: number;
}

interface IResponse extends IRequest {
  id: number;
}

const useAddFood = (): UseAxios<IRequest, IResponse> => {
  const [{ data, loading, error }, addFood] = useAxios(
    {
      url: API_ENDPOINTS.FOOD,
      method: 'POST',
    },
    {
      manual: true,
    },
  );

  return [{ data, loading, error }, addFood];
};

export default useAddFood;
