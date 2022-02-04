import useAxios from 'api/useAxios';
import API_ENDPOINTS from 'api/constants';
import { UseAxios } from 'api/types';

interface IResponse {
  last_week_entries: number;
  previous_week_entries: number;
}

const useGetReportOne = (): UseAxios<unknown, IResponse> => {
  const [{ data, loading, error }, getReportOne] = useAxios({
    url: API_ENDPOINTS.REPORT_ONE,
    method: 'GET',
  });

  return [{ data, loading, error }, getReportOne];
};

export default useGetReportOne;
