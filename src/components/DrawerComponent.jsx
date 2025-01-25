import HomeIcon from "@mui/icons-material/Home";
import ListAltIcon from "@mui/icons-material/ListAlt";
import BarChartIcon from "@mui/icons-material/BarChart";
import React, { useState, useEffect } from "react";
import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  Box,
  Typography,
  styled
} from "@mui/material";
import { Link } from "react-router-dom";
import InboxIcon from "@mui/icons-material/Inbox";
import MailIcon from "@mui/icons-material/Mail";
import clsx from "clsx";


const navItems = [
  { label: "Home", icon: <HomeIcon />, link: "/" },
  { label: "Transactions", icon: <ListAltIcon />, link: "/transactions" },
  { label: "Dashboard", icon: <BarChartIcon />, link: "/dashboard" },
];

// Styled component for the drawer
const DrawerContainer = styled("div")(({ theme, open }) => ({
  height: "100%",
  backgroundColor: theme.palette.grey[900],
  color: theme.palette.common.white,
  position: "fixed",
  transition: "width 0.3s ease-in-out",
  width: open ? "13rem" : "4rem",
  overflow: "hidden",
  zIndex: 5,
}));

// Styled component for navigation items
const NavItem = styled("li")({
  display: "flex",
  alignItems: "center",
  padding: "0.7rem 1rem",
  marginBottom: "0.7rem",
  color: "white",
  textDecoration: "none",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});

const NavLabel = styled("span")(({ open }) => ({
  marginLeft: "1rem",
  display: open ? "inline" : "none",
  transition: "opacity 0.3s ease-in-out",
}));

const DrawerComponent = () => {
  const isLargeScreen = useMediaQuery("(min-width:1280px)");
  const [open, setOpen] = useState(isLargeScreen);

  useEffect(() => {
    // Update the drawer state when screen size changes
    setOpen(isLargeScreen);
  }, [isLargeScreen]);

  return (
    <DrawerContainer
      open={open}
      onMouseEnter={() => !isLargeScreen && setOpen(true)}
      onMouseLeave={() => !isLargeScreen && setOpen(false)}
    >
      <ul style={{ listStyle: "none", padding: 0, marginTop: "4.5rem" }}>
        {navItems.map((item, index) => (
          <NavItem key={index}>
            <Link
              to={item.link}
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div>{item.icon}</div>
              <NavLabel open={open}>{item.label}</NavLabel>
            </Link>
          </NavItem>
        ))}
      </ul>
    </DrawerContainer>
  );
};

export default DrawerComponent;
