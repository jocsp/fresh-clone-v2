import React, { useEffect, useState } from 'react';

function DashboardCard({ status, tickets }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const newArray = tickets.filter((ticket) => ticket.status === status);
    setCount(newArray.length);
  }, []);

  return (
    <div className="dashboard-card">
      <span>{status}</span>
      <span style={{ fontSize: '1.5rem' }} className="m-top-10 bold">
        {count}
      </span>
    </div>
  );
}

export default DashboardCard;
