import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Header } from "Components/Header/Header";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRoutes, nursingRoutes } from "routes/routes";
import { isLoggedIn } from "services/authService";
import { iRoute } from "types/route";
import { USER_ROLE } from "utils/constant";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [privateRoutes, setPrivateRoutes] = useState<
    iRoute[] | string | undefined
  >([]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    if (isLoggedIn()) {
      setPrivateRoutes(getRoutes(localStorage.getItem(USER_ROLE) || "pending"));
    }
  }, []);

  const drawer = (
    <div>
      <List className=" rounded-tl-xl bg-white sm:bg-hussein-300">
        {(privateRoutes as iRoute[]).map((item: iRoute) => {
          if (!item.notShown) {
            return (
              <ListItem key={item.path} disablePadding>
                <Link className="w-full" to={item.path}>
                  <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText
                      className="underline"
                      primary={item.pageName}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            );
          }
        })}
      </List>
    </div>
  );

  return (
    <div className="h-full flex flex-col w-full gap-3 bg-hussein-100 p-4">
      <Header>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
      </Header>
      <div className="bg-hussein-200 w-full flex justify-between rounded-xl h-[calc(100%-6.5rem)]">
        <Box className=" rounded-l-xl bg-hussein-300" sx={{ display: "flex" }}>
          <Box
            component="nav"
            sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
          >
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  borderRadius: "0 0.75rem 0.75rem 0",
                  boxSizing: "border-box",
                  width: 240,
                },
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": {
                  borderTopLeftRadius: "0.75rem",
                  position: "initial",
                  boxSizing: "border-box",
                  width: 241,
                },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>
        </Box>
        <div className="w-full h-full py-8 px-4">{children}</div>
      </div>
      <div>
        © Mustafa Mahmood 2024. All rights reserved.{" "}
        <a
          href="mailto:mustafaalowisi@gmail.com"
          className="underline text-blue-700"
        >
          Email
        </a>
      </div>
    </div>
  );
};
