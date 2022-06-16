import AccountCircle from "@mui/icons-material/AccountCircle";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Container } from "@mui/system";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Login from "../../features/Auth/components/Login";
import Register from "../../features/Auth/components/Register";
import logo from "../../images/logo-header.png";
import "./styles.scss";

Header.propTypes = {};

const pages = [
  { title: "Biên độ", href: "/amplitude" },
  { title: "Slide", href: "/slide" },
];

function Header(props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

            <IconButton
              onClick={handleClickOpen}
              className="appbar__iconButton"
            >
              <AccountCircle className="appbar__icon" />
            </IconButton>
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
        <DialogContent>
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
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Header;
