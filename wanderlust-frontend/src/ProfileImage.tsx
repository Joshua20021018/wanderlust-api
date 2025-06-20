const ProfileImage = ({ filename }: { filename: string }) => {
  const imageUrl = `${process.env.REACT_APP_API_URL}/uploads/${filename}`;
  return <img src={imageUrl} alt="Uploaded" width="200" />;
};

export default ProfileImage;
