import React from "react";
import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";
import DashboardCard from "../components/DashboardCard";
import ToDo from "../components/ToDo/ToDo";
import { useAuthContext } from "../hooks/useAuthContext";
import ActivitiesDashboard from "../components/ActivitiesDashboard";

function Dashboard() {
  const {
    agent: { ticketsAssigned },
  } = useAuthContext();

  return (
    <div>
      <NavBar />
      <TopBar title="Dashboard" />
      {/* <div className="bottom-bar" /> */}
      <div className="dashboard-card-container">
        <DashboardCard status="Open" tickets={ticketsAssigned} />
        <DashboardCard status="In process" tickets={ticketsAssigned} />
        <DashboardCard status="Pending" tickets={ticketsAssigned} />
      </div>

      <div className="todo-activities-container">
        <ToDo />

        <ActivitiesDashboard />
      </div>
    </div>
  );
}

export default Dashboard;
