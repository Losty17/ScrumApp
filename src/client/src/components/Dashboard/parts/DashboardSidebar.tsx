import {
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import * as React from "react";

interface IDashboardSidebarProps {
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
}
const DashboardSidebar: React.FC<IDashboardSidebarProps> = ({
  view,
  setView,
}) => {
  const drawerWidth = 220;
  const views = ["Overview", "Backlog", "Team", "Settings"];

  const handleViewChange = (event: React.MouseEvent<HTMLDivElement>) => {
    setView(event.currentTarget.id);
  };
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "primary.main",
          border: "none",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar>
        <Typography variant="h5">Dashboard</Typography>
      </Toolbar>
      <Divider light />
      <List
        sx={{
          borderRight: "1px solid rgba(232, 217, 225, 0.08)",
          height: "100%",
        }}
      >
        {views.map((text, index) => (
          <ListItemButton
            id={text.toLowerCase()}
            key={index}
            onClick={handleViewChange}
            disabled={text.toLowerCase() === view}
          >
            <ListItemText
              primary={text}
              sx={{
                paddingLeft: view === text.toLowerCase() ? "40px" : "30px",
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default DashboardSidebar;
