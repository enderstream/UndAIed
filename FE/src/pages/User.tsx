import { useParams } from "react-router-dom";

function User() {
  const { userId } = useParams();

  return (
    <>
      <h1>User page</h1>
      <span>유저 아이디: {userId}</span>
    </>
  );
}

export default User;
