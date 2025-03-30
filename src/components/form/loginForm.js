import { Alert, Button, Snackbar, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { addUser, setIsAdmin } from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { SIGN_IN } from "../../constants/string";
import { credentialList } from "../../constants/loginCredentials";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    const foundUser = credentialList.find(
      (cred) =>
        cred.username === username &&
        cred.email === email &&
        cred.password === password
    );

    if (foundUser) {
      dispatch(addUser({ username, email, password }));
      dispatch(setIsAdmin(foundUser.isAdmin));
      navigate("/postList");
    } else {
      setOpen(true);
    }
  };

  return (
    <div className="login-form-container">
      <TextField
        className="login-text-input"
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        className="login-text-input"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        className="login-text-input"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        onClick={handleSignIn}
        sx={{ width: "100%", bgcolor: "black" }}
        variant="contained"
      >
        {SIGN_IN}
      </Button>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert severity="error" onClose={() => setOpen(false)}>
          Invalid credentials
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LoginForm;
