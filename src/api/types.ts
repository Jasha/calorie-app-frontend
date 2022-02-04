import {
  AxiosError,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { RefetchOptions } from 'axios-hooks';

export type UseAxios<TRequest, TResponse> = [
  {
    response?: AxiosResponse<TResponse>;
    data: TResponse;
    loading: boolean;
    error: AxiosError<any, any> | null;
  },
  (
    config?: AxiosRequestConfig<TRequest>,
    options?: RefetchOptions,
  ) => AxiosPromise<TResponse>,
];

export interface ApiPaginatedResponse<TResponse> {
  next?: number;
  previous?: number;
  count: number;
  results: TResponse[];
}
