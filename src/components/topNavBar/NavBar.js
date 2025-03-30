import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu, MenuItem } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { resetUser } from "../../slices/userSlice";
import { LOGIN, LOGOUT, POST_LIST } from "../../constants/string";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const { user } = useSelector((state) => state.user);

  const onClickLogin = () => {
    navigate("/login");
  };

  const onClickUsername = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    dispatch(resetUser());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ backgroundColor: "gray" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {POST_LIST}
          </Typography>

          {Object.keys(user).length === 0 ? (
            <Button color="inherit" onClick={onClickLogin}>
              {LOGIN}
            </Button>
          ) : (
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={onClickUsername}
              color="inherit"
            >
              {user.username}
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem style={{ gap: 10 }} onClick={handleLogout}>
          <LogoutIcon />
          <div>{LOGOUT}</div>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default NavBar;
