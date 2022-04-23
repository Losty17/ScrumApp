import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IDashboardProps {}
const Dashboard: React.FC<IDashboardProps> = () => {
  const navigate = useNavigate();

  /**
   * Validate session
   */
  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    fetch("/api/authenticate", { headers: { token: token } }).then(
      async (res) => {
        const data = await res.json();

        if (!data.auth) navigate("/login");
      }
    );
  }, []);
  return (
    <>
      <h1>Dashboard</h1>
    </>
  );
};

export default Dashboard;
