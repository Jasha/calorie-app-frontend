import { useNutritionixAxios } from 'api/useAxios';
import API_ENDPOINTS from 'api/constants';
import { UseAxios } from 'api/types';

export interface IRequest {
  query: string;
}

interface IFood {
  nf_calories: number;
}

export interface IResponse {
  foods: Array<IFood>;
}

const useGetCommonCalorie = (): UseAxios<IRequest, IResponse> => {
  const [{ data, loading, error }, getCommonCalorie] = useNutritionixAxios(
    {
      url: API_ENDPOINTS.COMMON_CALORIE,
      method: 'POST',
    },
    {
      manual: true,
    },
  );

  return [{ data, loading, error }, getCommonCalorie];
};

export default useGetCommonCalorie;
