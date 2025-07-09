import { useSelector } from "react-redux";
import RulesBox from "./RulesBox";

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <h1 className="title">Dashboard</h1>
      <h2 className="subtitle">
        Welcome Back <strong>{user && user.name}</strong>
      </h2>
      <RulesBox isAdmin={user?.role === "admin"} />
    </div>
  );
};

export default Welcome;
