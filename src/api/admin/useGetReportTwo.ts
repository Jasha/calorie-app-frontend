import useAxios from 'api/useAxios';
import API_ENDPOINTS from 'api/constants';
import { UseAxios } from 'api/types';

interface IResponse {
  name: string;
  average_calories: number;
}

const useGetReportTwo = (): UseAxios<unknown, Array<IResponse>> => {
  const [{ data, loading, error }, getReportTwo] = useAxios({
    url: API_ENDPOINTS.REPORT_TWO,
    method: 'GET',
  });

  return [{ data, loading, error }, getReportTwo];
};

export default useGetReportTwo;
