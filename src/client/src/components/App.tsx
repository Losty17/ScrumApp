import * as React from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import Login from "./Login";
import Logout from "./Logout";
import Home from "./Home";
import Dashboard from "./Dashboard";

const Routes = () => {
  const element = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/home", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/logout", element: <Logout /> },
    { path: "/register", element: <h1>Register</h1> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "*", element: <h1>404</h1> },
  ]);

  return element;
};

interface IAuthProps {}
const App: React.FC<IAuthProps> = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};

export default App;
