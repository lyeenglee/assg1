import { Card, Typography } from "@mui/material";
import LoginForm from "../components/form/loginForm";
import "../styles/styles.css"
const Login = () => {
  return (
    <Card className="card-container">
      <Typography variant="h1" component="h1">
        Logo
      </Typography>

      <LoginForm />
    </Card>
  );
};

export default Login;
