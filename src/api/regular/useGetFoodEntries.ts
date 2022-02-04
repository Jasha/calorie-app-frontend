import useAxios from 'api/useAxios';
import API_ENDPOINTS from 'api/constants';
import { UseAxios } from 'api/types';

export interface IRequest {
  from_date: string;
  to_date: string;
}

export interface IResponse {
  id: number;
  date: string;
  name: string;
  calorie: number;
}

const useGetFoodEntries = (): UseAxios<IRequest, Array<IResponse>> => {
  const [{ data, loading, error }, getFoodEntries] = useAxios(
    {
      url: API_ENDPOINTS.FOOD,
      method: 'GET',
    },
    {
      manual: true,
    },
  );

  return [{ data, loading, error }, getFoodEntries];
};

export default useGetFoodEntries;
