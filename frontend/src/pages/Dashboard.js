import React from "react";
import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";
import DashboardCard from "../components/DashboardCard";

function Dashboard() {
  return (
    <div>
      <NavBar />
      <TopBar title="Dashboard" />
      <div className="bottom-bar"></div>
      <div className="dashboard-card-container">
        <DashboardCard status="Open" />
        <DashboardCard status="Pending" />
        <DashboardCard status="On hold" />
      </div>
    </div>
  );
}

export default Dashboard;
