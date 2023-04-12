import React from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import useRequest from '../hooks/useRequest';

const ProfileImage = ({ profile }) => {
  const { dispatch } = useAuthContext();
  const { sendRequest } = useRequest();

  const logoutAgent = async () => {
    const response = await sendRequest({
      method: 'GET',
      url: 'api/user/logout',
    });

    if (response.data.loggedOut) {
      dispatch({ type: 'LOGOUT' });
    }
  };

  return (
    <div
      onClick={logoutAgent}
      className="profile-image m-right-10"
      style={{ backgroundColor: profile.color }}
    >
      {profile.name[0].toUpperCase()}
    </div>
  );
};

export default ProfileImage;
