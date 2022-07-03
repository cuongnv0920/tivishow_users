import { AppBar, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Container } from "@mui/system";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Login from "../../features/Auth/components/Login";
import Register from "../../features/Auth/components/Register";
import Setting from "../../features/Auth/components/Setting";
import { logout } from "../../features/Auth/userSlice";
import logo from "../../images/logo-header.png";
import "./styles.scss";

Header.propTypes = {};

const pages = [
  { title: "Quản trị", href: "admin", role: "admin" },
  { title: "Biên độ", href: "amplitude", role: "admin" },
  { title: "Lãi suất tại quầy", href: "interest", role: "admin" },
  { title: "Poster", href: "poster", role: "user" },
];

function Header(props) {
  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser._id;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);
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

  const handleOpenSetting = () => {
    setOpenSetting(true);
  };
  const handleCloseSetting = () => {
    setOpenSetting(false);
  };

  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);
    setAnchorEl(null);

    navigate("/", { replace: true });
  };

  const pageMenus = pages.filter((page, _) => page.role === loggedInUser.role);

  return (
    <div>
      <AppBar position="static" className="appbar">
        <Container maxWidth="xl">
          <Toolbar variant="dense" className="appbar__toolbar">
            <Link to="/" className="appbar__link">
              <img src={logo} alt="logo header" className="appbar_image" />
            </Link>

            <ul className="appbar__menu menu">
              {pageMenus.map((pageMenu, index) => (
                <Link to={pageMenu.href} key={index} className="menu__item">
                  {pageMenu.title}
                </Link>
              ))}
            </ul>

            {!isLoggedIn && (
              <Button className="appbar__login" onClick={handleClickOpen}>
                Đăng nhập
              </Button>
            )}

            {isLoggedIn && (
              <div>
                <Button
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  className="buttonUser"
                  onClick={handleMenuOpen}
                >
                  <Typography className="buttonUser__username">
                    {loggedInUser.username}
                  </Typography>
                </Button>
                <Menu
                  className="buttonUser__menu"
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem
                    className="buttonUser__menuItem"
                    onClick={handleOpenSetting}
                  >
                    Đổi mật khẩu
                  </MenuItem>
                  <MenuItem
                    className="buttonUser__menuItem"
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

      <Dialog
        open={openSetting}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleCloseSetting(event, reason);
          }
        }}
      >
        <DialogContent className="dialog">
          <Setting closeDialog={handleCloseSetting} />
        </DialogContent>
        <DialogActions>
          <Button className="dialog__cancel" onClick={handleCloseSetting}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Header;
