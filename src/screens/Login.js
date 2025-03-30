import { Card, Typography } from "@mui/material";
import LoginForm from "../components/form/loginForm";
import "../styles/styles.css";
import { LOGO } from "../constants/string";

const Login = () => {
  return (
    <Card className="login-container">
      <Typography variant="h1" component="h1" className="logo">
        {LOGO}
      </Typography>

      <LoginForm />
    </Card>
  );
};

export default Login;
