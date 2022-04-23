import * as React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ILogoutProps {}
const Logout: React.FC<ILogoutProps> = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("token");
    navigate("/");
  }, []);
  return <>Loging out...</>;
};

export default Logout;
