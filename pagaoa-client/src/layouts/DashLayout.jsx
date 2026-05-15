import { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";

import { styled, useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";

import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";
import InsightsIcon from "@mui/icons-material/Insights";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const drawerWidth = 240;

const PRIMARY = "#070546";
const LIGHT = "#f3ede6";

const dashboardNavItems = [
  {
    label: "Dashboard",
    title: "Dashboard",
    to: "/dashboard",
    icon: DashboardIcon,
  },
  {
    label: "Reports",
    title: "Reports",
    to: "/dashboard/reports",
    icon: AssessmentIcon,
  },
  { label: "Users", title: "Users", to: "/dashboard/users", icon: PeopleIcon },
  {
    label: "articles",
    title: "Articles",
    to: "/dashboard/articles",
    icon: InsightsIcon,
  },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width"),
  overflowX: "hidden",
  backgroundColor: PRIMARY,
  color: LIGHT,
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width"),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  backgroundColor: PRIMARY,
  color: LIGHT,
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 8px",
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: PRIMARY,
  color: LIGHT,
}));

const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 20,
  backgroundColor: alpha(LIGHT, 0.15),
  marginRight: theme.spacing(2),
  "&:hover": {
    backgroundColor: alpha(LIGHT, 0.25),
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  position: "absolute",
  height: "100%",
  display: "flex",
  alignItems: "center",
  color: LIGHT,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: LIGHT,
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
}));

const getPageTitle = (pathname) =>
  dashboardNavItems.find((item) => item.to === pathname)?.title || "Welcome";

const DashLayout = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const pageTitle = getPageTitle(location.pathname);

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  const toggleDrawer = () => setOpen(!open);

  const handleLogout = () => navigate("/");

  return (
    <Box sx={{ display: "flex", backgroundColor: LIGHT, minHeight: "100vh" }}>
      <CssBaseline />

      <AppBar position="fixed">
        <Toolbar>
          <IconButton sx={{ color: LIGHT, mr: 2 }} onClick={toggleDrawer}>
            {open ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>

          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontFamily: "'Playfair Display', serif",
              letterSpacing: 1,
            }}
          >
            {pageTitle}
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search..." />
          </Search>

          <Button
            variant="outlined"
            onClick={handleLogout}
            sx={{
              color: LIGHT,
              borderColor: LIGHT,
              "&:hover": {
                backgroundColor: LIGHT,
                color: PRIMARY,
              },
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography sx={{ color: LIGHT, fontSize: 14 }}>
            {open ? "Menu" : ""}
          </Typography>

          <IconButton sx={{ color: LIGHT }} onClick={toggleDrawer}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider sx={{ borderColor: alpha(LIGHT, 0.2) }} />

        <List>
          {dashboardNavItems.map(({ label, to, icon: Icon }) => (
            <ListItem key={to} disablePadding>
              <ListItemButton
                component={Link}
                to={to}
                selected={location.pathname === to}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  justifyContent: open ? "initial" : "center",
                  color: LIGHT,
                  mx: 1,
                  my: 0.5,
                  borderRadius: 2,
                  "&.Mui-selected": {
                    backgroundColor: alpha(LIGHT, 0.2),
                  },
                  "&:hover": {
                    backgroundColor: alpha(LIGHT, 0.1),
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: LIGHT,
                  }}
                >
                  <Icon />
                </ListItemIcon>

                <ListItemText primary={label} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: LIGHT,
          color: PRIMARY,
        }}
      >
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashLayout;
