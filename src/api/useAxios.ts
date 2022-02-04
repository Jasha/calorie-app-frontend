import Axios from 'axios';
import { makeUseAxios } from 'axios-hooks';

import { getUser } from 'utils/userService';

const calorieAxios = Axios.create({
  baseURL: process.env.REACT_APP_CALORIE_URL,
});

calorieAxios.interceptors.request.use(
  async (config) => {
    const user = getUser();

    if (user) {
      config.headers = {
        authorization: `Token ${user.token}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error),
);

const nutritionixAxios = Axios.create({
  baseURL: process.env.REACT_APP_NUTRITIONIX_URL,
  headers: {
    'x-app-id': process.env.REACT_APP_NUTRITIONIX_APP_ID || '',
    'x-app-key': process.env.REACT_APP_NUTRITIONIX_APP_KEY || '',
  },
});

const useAxios = makeUseAxios({
  axios: calorieAxios,
});

export const useNutritionixAxios = makeUseAxios({
  axios: nutritionixAxios,
});

export default useAxios;
