import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import DashboardViews from "./DashboardViews";
import { Box } from "@mui/material";

interface IDashboardProps {}
const Dashboard: React.FC<IDashboardProps> = () => {
  const [view, setView] = useState("overview");

  /**
   * Validate session
   */
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    fetch("/api/authenticate", { headers: { token: token } }).then(
      async (res) => {
        const data = await res.json();

        if (!data.auth) navigate("/login");
      }
    );
  }, [navigate]);

  return (
    <Box sx={{ display: "flex" }}>
      <DashboardSidebar view={view} setView={setView} />
      <DashboardViews route={view} />
    </Box>
  );
};

export default Dashboard;
