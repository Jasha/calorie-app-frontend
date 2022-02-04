import useAxios from 'api/useAxios';
import API_ENDPOINTS from 'api/constants';
import { UseAxios } from 'api/types';

interface IRequest {
  name: string;
  email: string;
}

const useInviteFriend = (): UseAxios<IRequest, unknown> => {
  const [{ data, loading, error }, invite] = useAxios(
    {
      url: API_ENDPOINTS.INVITE,
      method: 'POST',
    },
    {
      manual: true,
    },
  );

  return [{ data, loading, error }, invite];
};

export default useInviteFriend;
