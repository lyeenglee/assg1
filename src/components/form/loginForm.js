import { Button, Checkbox, TextField } from "@mui/material";

const LoginForm = () => {
  const handleChange = () => {};
  return (
    <div className="formCard">
      <TextField className="text-input" label="Username" defaultValue="" placeholder="Value" />
      <TextField  className="text-input" label="Password" defaultValue="" placeholder="Value" />
      <Button  className="text-input login-btn" >Sign In</Button>
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
