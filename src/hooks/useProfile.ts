import { useState, useEffect } from 'react';
import useGetProfile, { IResponse as IProfile } from 'api/common/useGetProfile';

const useProfile = () => {
  const [profileData, setProfileData] = useState<IProfile | null>(null);

  const [{ data }, getProfile] = useGetProfile();

  useEffect(() => {
    if (!profileData) {
      getProfile();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (data) {
      setProfileData(data);
    }
  }, [data]);

  return [profileData];
};

export default useProfile;
