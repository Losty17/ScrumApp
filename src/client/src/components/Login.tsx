import { useEffect, useState } from "react";
import { Button, Link, Typography, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

/**
 * Support function to check if a string is a valid email address
 *
 * @param email string
 * @returns boolean
 */
const validateEmail = (email: string) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

interface ILoginProps {}
const Login: React.FC<ILoginProps> = (): JSX.Element => {
  const [disableLogin, setDisableLogin] = useState(true);
  const [error, setError] = useState("");
  const [isAuth, setAuth] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    if (validateEmail(email.value)) {
      setError("");
      const loginData = {
        email: email.value,
        password: password.value,
      };

      const login = await fetch("/api/login", {
        method: "post",
        headers: loginData,
      }).then(async (res) => await res.json());

      if (login.auth) {
        setError("");
        localStorage.setItem("token", login.token);
        setAuth(true);
      } else {
        setError(login.error);
      }
    } else {
      setDisableLogin(true);
      setError("Please enter a valid email address");
    }
  };

  /**
   * Enable or disable login button
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    if (email.value !== "" && password.value !== "") {
      setDisableLogin(false);
    } else setDisableLogin(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    fetch("/api/authenticate", { headers: { token: token } }).then(
      async (res) => {
        const data = await res.json();

        if (data.auth) navigate("/dashboard");
        else {
          setAuth(false);
          localStorage.removeItem("token");
        }
      }
    );
  }, [isAuth]);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh" }}
    >
      <Grid
        container
        direction="column"
        justifyContent="space-evenly"
        alignItems="center"
        sx={{
          height: "40vh",
          width: "20vw",
        }}
      >
        <TextField
          label="Email"
          id="email"
          onChange={handleInputChange}
          error={error !== ""}
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          id="password"
          onChange={handleInputChange}
          error={error !== ""}
          helperText={error}
          fullWidth
        />
        <Button
          disabled={disableLogin}
          id="login-button"
          variant="outlined"
          onClick={handleLogin}
          fullWidth
        >
          Login
        </Button>
        <Typography variant="caption">
          Novo aqui? <Link href="/register">Registre-se!</Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Login;
