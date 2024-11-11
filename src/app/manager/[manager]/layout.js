"use client";
import "@/globals/globals.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Logo from "../../assets/logo.jsx";
import { useRouter } from "next/navigation";
import { signOutUser } from "../../login/authentication.js";
import { observer } from "mobx-react-lite";
import user from "@/store/user.js";
import { setPersistence, browserLocalPersistence } from "firebase/auth";
import { auth } from "@/app/data model/client actions/firebaseapp.js";

const Layout = observer(({ children }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter();

  React.useEffect(() => {
    if (auth.currentUser === null) {
      router.push(`/login/`);
    } else {
      console.log(auth.currentUser === null);
      user.setUserid(auth.currentUser.uid);

      const persist = async () => {
        await setPersistence(auth, browserLocalPersistence);
        user.setUserid(auth.currentUser.uid);
        console.log(auth.currentUser.uid);
      };
      persist();
    }
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async () => {
    await signOutUser();
    router.push(`/login/`);
  };

  return (
    <Box sx={{ height: "100%" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, width: "60px", height: "60px" }}
            onClick={() => {
              router.push(`/manager/${user.userid}`);
            }}
          >
            <Logo />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              flexGrow: 1,

              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            БЫСТРЁНОК
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              sx={{ fontSize: 30 }}
            >
              <AccountCircle sx={{ fontSize: 40 }} />
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={() => {
                setAnchorEl(null);
              }}
            >
              <MenuItem onClick={() => handleClose()}>Выйти</MenuItem>
              {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      {children}
    </Box>
  );
});

export default Layout;
