import AccountCircle from "@mui/icons-material/AccountCircle";
import { AppBar, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Container } from "@mui/system";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Login from "../../features/Auth/components/Login";
import Register from "../../features/Auth/components/Register";
import { logout } from "../../features/Auth/userSlice";
import logo from "../../images/logo-header.png";
import "./styles.scss";

Header.propTypes = {};

const pages = [
  { title: "Biên độ", href: "/amplitude" },
  { title: "Slide", href: "/slide" },
];

function Header(props) {
  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser._id;

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar position="static" className="appbar">
        <Container maxWidth="xl">
          <Toolbar variant="dense" className="appbar__toolbar">
            <Link to="/" className="appbar__link">
              <img src={logo} alt="logo header" className="appbar_image" />
            </Link>

            <ul className="appbar__menu menu">
              {pages.map((page, index) => (
                <li key={index} className="menu__item">
                  <a href={page.href} className="menu__link">
                    {page.title}
                  </a>
                </li>
              ))}
            </ul>

            {!isLoggedIn && (
              <Button className="appbar__login" onClick={handleClickOpen}>
                Đăng nhập
              </Button>
            )}

            {isLoggedIn && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  className="appbar__iconButton"
                  onClick={handleMenuOpen}
                >
                  <AccountCircle className="appbar__icon" />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bootom",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem className="appbar_menuItem">
                    Cài đặt tài khoản
                  </MenuItem>
                  <MenuItem
                    className="appbar_menuItem"
                    onClick={handleLogoutClick}
                  >
                    Thoát
                  </MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Dialog
        open={open}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleClose(event, reason);
          }
        }}
      >
        <DialogContent className="dialog">
          <Tabs>
            <TabList>
              <Tab>Đăng nhập</Tab>
              <Tab>Đăng ký</Tab>
            </TabList>

            <TabPanel>
              <Login closeDialog={handleClose} />
            </TabPanel>
            <TabPanel>
              <Register closeDialog={handleClose} />
            </TabPanel>
          </Tabs>
        </DialogContent>
        <DialogActions>
          <Button className="dialog__cancel" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Header;
