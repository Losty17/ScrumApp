import { Button } from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";

interface IHomeProps {}
const Home: React.FC<IHomeProps> = () => {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, []);
  return (
    <>
      {logged ? (
        <>
          <Button href="/logout">Logout</Button>
          <Button href="/dashboard">Dashboard</Button>
        </>
      ) : (
        <Button href="/login">Login</Button>
      )}
    </>
  );
};

export default Home;
