import React from "react";

const ProfileImage = ({
  profile,
  size,
  clickable = false,
  handleClick = () => null,
}) => {
  const styleSize = size ? size : "small";
  const clickableStyle = clickable
    ? "profile-img-clickable"
    : "profile-img-nonclickable";

  return (
    <button
      onClick={handleClick}
      className={`profile-image m-right-10 pi-${styleSize} ${clickableStyle}`}
      style={{ backgroundColor: profile?.color }}
    >
      {profile?.name[0].toUpperCase()}
    </button>
  );
};

export default ProfileImage;
