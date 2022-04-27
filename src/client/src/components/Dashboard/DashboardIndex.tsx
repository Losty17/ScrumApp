import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "./parts/DashboardSidebar";
import DashboardToolbar from "./parts/DashboardToolbar";
import DashboardViews from "./DashboardViews";
import { Box } from "@mui/material";

interface IDashboardProps {}
const Dashboard: React.FC<IDashboardProps> = () => {
  const boxSx = { margin: "20px", width: "100%", height: "90vh" };

  const [view, setView] = useState("overview"); // Current route
  const [sprint, setSprint] = useState({
    name: "Placeholder-001",
    startDate: "01/01/01",
    endDate: "02/02/02",
  }); // Selected Sprint

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
    <Box sx={{ display: "flex", marginTop: "64px" }}>
      <DashboardSidebar view={view} setView={setView} />
      <DashboardToolbar sprint={sprint} setSprint={setSprint} />
      <Box sx={boxSx}>
        <DashboardViews route={view} />
      </Box>
    </Box>
  );
};

export default Dashboard;
