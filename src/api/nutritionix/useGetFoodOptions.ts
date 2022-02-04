import { useNutritionixAxios } from 'api/useAxios';
import API_ENDPOINTS from 'api/constants';
import { UseAxios } from 'api/types';

export interface IRequest {
  query: string;
}

interface ICommonFood {
  food_name: string;
  tag_id: string;
}

interface IBrandedFood {
  food_name: string;
  nix_item_id: string;
}

export interface IResponse {
  common: Array<ICommonFood>;
  branded: Array<IBrandedFood>;
}

const useGetFoodOptions = (): UseAxios<IRequest, IResponse> => {
  const [{ data, loading, error }, getFoodOptions] = useNutritionixAxios(
    {
      url: API_ENDPOINTS.FOOD_OPTIONS,
      method: 'GET',
    },
    {
      manual: true,
    },
  );

  return [{ data, loading, error }, getFoodOptions];
};

export default useGetFoodOptions;
