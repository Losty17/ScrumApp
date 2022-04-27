import { AccountCircle } from "@mui/icons-material";
import {
  AppBar,
  Toolbar,
  Typography,
  Divider,
  IconButton,
  Box,
} from "@mui/material";
import * as React from "react";

interface IToolbarProps {
  sprint: { name: string; startDate: string; endDate: string };
  setSprint: React.Dispatch<
    React.SetStateAction<{
      name: string;
      startDate: string;
      endDate: string;
    }>
  >;
}
const DashboardToolbar: React.FC<IToolbarProps> = ({ sprint, setSprint }) => {
  return (
    <AppBar
      elevation={0}
      sx={{
        paddingLeft: "220px",
        backgroundColor: "background.default",
        // borderBottom: "1px solid",
        borderColor: "rgba(232, 217, 225, 0.08)",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Toolbar sx={{ width: "100%" }}>
        <Box flexGrow={1} display="flex">
          <Typography variant="h5">{sprint.name}</Typography>
          <Typography
            variant="h5"
            color="secondary.main"
            sx={{ marginLeft: "20px" }}
          >
            {sprint.startDate} - {sprint.endDate}
          </Typography>
        </Box>
        <Box flexGrow={0}>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardToolbar;
