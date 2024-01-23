import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function Home() {
  const navigator = useNavigate();
  const logOut = () => {
    auth.signOut();
    navigator("/login");
  };
  return (
    <h1>
      <button onClick={logOut}>Log Out</button>
    </h1>
  );
}
