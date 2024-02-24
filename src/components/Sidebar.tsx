import { tokenAtom, userAtom } from "@/util/atoms";
import { auth } from "@/util/firebase";
import {
  alpha,
  Box,
  Button,
  Divider,
  Drawer,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { signOut as firebaseSignout } from "firebase/auth";
import { useSetAtom } from "jotai";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { pages } from "../pages";
import { FaPersonRunning } from "react-icons/fa6";

const style = {
  minHeight: 44,
  borderRadius: 0.75,
  typography: "body2",
  color: "text.secondary",
  textTransform: "capitalize",
  fontWeight: "fontWeightMedium",
};

export const Sidebar = () => {
  const drawerWidth = 250;
  const navigate = useNavigate();
  const location = useLocation();
  const setUser = useSetAtom(userAtom);
  const setToken = useSetAtom(tokenAtom);

  const signOut = useCallback(() => {
    firebaseSignout(auth).then(() => {
      setUser(null);
      setToken(null);
    });
  }, [setUser, setToken]);

  return (
    <Drawer
      anchor="left"
      variant="permanent"
      sx={{
        width: drawerWidth,
      }}
    >
      <Box sx={{ width: drawerWidth }} role="presentation" pt={2}>
        <Typography width="100%" textAlign="center">
          Feladatbeküldő
        </Typography>
        <Stack gap={1} sx={{ p: 2 }}>
          {pages.map((page) => {
            const active = location.pathname === page.path;
            return (
              <ListItem
                key={page.name}
                disablePadding
                onClick={() => {
                  navigate(page.path);
                }}
              >
                <ListItemButton
                  sx={{
                    ...style,
                    ...(active && {
                      color: "primary.main",
                      fontWeight: "fontWeightSemiBold",
                      bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, 0.08),
                      "&:hover": {
                        bgcolor: (theme) =>
                          alpha(theme.palette.primary.main, 0.16),
                      },
                    }),
                  }}
                >
                  <Stack direction="row" gap={2} alignItems="center">
                    <Typography fontSize={22} lineHeight={0}>
                      <page.icon />
                    </Typography>
                    <ListItemText primary={page.name} />
                  </Stack>
                </ListItemButton>
              </ListItem>
            );
          })}
          <Divider />
          <Button
            variant="text"
            sx={{
              color: "text.secondary",
              mt: "auto",
            }}
            startIcon={<FaPersonRunning />}
            onClick={signOut}
          >
            <ListItemText primary="Kijelentkezés" />
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
};
