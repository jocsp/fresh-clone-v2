import axios from "axios";
import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

function DashboardCard({ status }) {
  const [countTicket, setCountTicket] = useState(0);
  const { agent: agent } = useAuthContext();

  return (
    <div className="dashboard-card">
      <span>{status}</span>
      <span style={{ fontSize: "1.5rem" }} className="m-top-10 bold">
        {countTicket}
      </span>
    </div>
  );
}

export default DashboardCard;
