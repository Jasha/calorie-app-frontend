import useAxios from 'api/useAxios';
import API_ENDPOINTS from 'api/constants';
import { ApiPaginatedResponse, UseAxios } from 'api/types';

export interface IResponse {
  id: number;
  user: number;
  user_name: string;
  date: string;
  name: string;
  calorie: number;
}

const useGetUserFoodEntries = (): UseAxios<
  unknown,
  ApiPaginatedResponse<IResponse>
> => {
  const [{ data, loading, error }, getUserFoodEntries] = useAxios(
    {
      url: API_ENDPOINTS.ADMIN_FOOD,
      method: 'GET',
    },
    {
      manual: true,
    },
  );

  return [{ data, loading, error }, getUserFoodEntries];
};

export default useGetUserFoodEntries;
