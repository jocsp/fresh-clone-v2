import React from 'react';

const ProfileImage = ({ profile }) => {
  return (
    <div
      className="profile-image m-right-10"
      style={{ backgroundColor: profile.color }}
    >
      {profile.name[0].toUpperCase()}
    </div>
  );
};

export default ProfileImage;
