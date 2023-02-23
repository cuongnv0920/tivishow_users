import LogoutIcon from "@mui/icons-material/Logout";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import branch from "configs/branch.conf";
import { logout } from "features/Auth/authSlice";
import Login from "features/Auth/component/Login";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import logo from "../../../images/logo-header.png";
import "./styles.scss";

Header.propTypes = {};

const menuList = [
  {
    name: "Tỷ giá",
    href: "margin",
    role: "admin",
  },
  {
    name: "Lãi suất",
    href: "deposit",
    role: "admin",
  },
  {
    name: "Video",
    href: "film",
    role: "admin",
  },
  {
    name: "Poster",
    href: "poster",
    role: "admin",
  },
];

export function Header(props) {
  const logged = useSelector((state) => state.auth.current);
  const isLogged = !!logged._id;
  const [openAuth, setOpenAuth] = useState(false);

  const dispatch = useDispatch();

  const handleOpenAuth = () => {
    setOpenAuth(true);
  };
  const handleCloseAuth = () => {
    setOpenAuth(false);
  };

  const handleLogout = () => {
    const action = logout();
    dispatch(action);
  };

  return (
    <Box position="static" className="appbar">
      <Container maxWidth="xl">
        <Toolbar className="appbar__toolbar">
          <a href="/" className="appbar__link">
            <img
              src={logo}
              alt="logo header"
              title="Trang chủ"
              className="appbar__logo"
            />
          </a>
          {!isLogged && (
            <Typography className="appbar__title">
              {`NGÂN HÀNG TMCP ĐẦU TƯ VÀ PHÁT TRIỂN VIỆT NAM - ${branch.name}`}
            </Typography>
          )}

          {isLogged && (
            <ul className="appbar__menu menu">
              {menuList.map((menu) => (
                <NavLink
                  to={menu.href}
                  key={menu.name}
                  className="menu__navLink"
                >
                  {menu.name}
                </NavLink>
              ))}
            </ul>
          )}

          {!isLogged && (
            <button onClick={handleOpenAuth} className="appbar__button">
              Đăng nhập
            </button>
          )}

          {isLogged && (
            <IconButton
              aria-label="logout account"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleLogout}
              title="Thoát"
            >
              <LogoutIcon sx={{ color: "#f50057" }} />
            </IconButton>
          )}
        </Toolbar>
      </Container>

      <Dialog
        fullWidth="xs"
        maxWidth="xs"
        open={openAuth}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleCloseAuth(event, reason);
          }
        }}
      >
        <DialogContent>
          <Login closeDialog={handleCloseAuth} />
        </DialogContent>
        <DialogActions className="dialogAction">
          <Button className="dialogButtonCancel" onClick={handleCloseAuth}>
            Thoát
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
