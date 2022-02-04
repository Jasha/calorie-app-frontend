import { useNutritionixAxios } from 'api/useAxios';
import API_ENDPOINTS from 'api/constants';
import { UseAxios } from 'api/types';

export interface IRequest {
  nix_item_id: string;
}

interface IFood {
  nf_calories: number;
}

export interface IResponse {
  foods: Array<IFood>;
}

const useGetBrandedCalorie = (): UseAxios<IRequest, IResponse> => {
  const [{ data, loading, error }, getBrandedCalorie] = useNutritionixAxios(
    {
      url: API_ENDPOINTS.BRANDED_CALORIE,
      method: 'GET',
    },
    {
      manual: true,
    },
  );

  return [{ data, loading, error }, getBrandedCalorie];
};

export default useGetBrandedCalorie;
