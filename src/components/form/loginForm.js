import { Button, Checkbox, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { addUser } from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = () => {};
  const handleSignIn = () => {
    dispatch(addUser({ username: "John Doe", password: "password123" }));
    navigate("/postList")
  };
  return (
    <div className="formCard">
      <TextField className="text-input" label="Username" defaultValue="" placeholder="Value" />
      <TextField  className="text-input" label="Password" defaultValue="" placeholder="Value" />
      <Button  className="text-input login-btn" onClick={handleSignIn}>Sign In</Button>
      <Checkbox
        checked={true}
        onChange={handleChange}
        name="Remember Password"
        className="rmb-pwd-link"
      />
    </div>
  );
};

export default LoginForm;
