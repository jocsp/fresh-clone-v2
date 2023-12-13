import React from "react";

import ProfileImage from "./ProfileImage";
import { Link } from "react-router-dom";
import { timeAgo } from "../scripts/dateScripts";
import useFetchData from "../hooks/useFetchData";

function ActivitiesDashboard() {
  const {
    data: activities,
    loaded,
    error,
  } = useFetchData("/api/activity/get-all");

  return (
    <div className="activities-dashboard-container">
      <p className="bold">Recent activities</p>
      {loaded &&
        activities.map((activity) => {
          return (
            <div className="activity" key={activity._id}>
              <ProfileImage profile={activity} />
              <div>
                <p>
                  <span className="bold">{activity.name}</span> {activity.verb}{" "}
                  {activity.predicate}{" "}
                  <Link
                    className="ticket-link"
                    to={"/ticket/" + activity.ticket_number}>
                    {activity.ticket_name} {`(#${activity.ticket_number})`}
                  </Link>
                  {activity.complement ? " to " + activity.complement : null}
                </p>
                <p className="light-font">{timeAgo(activity.date)}</p>
              </div>
            </div>
          );
        })}

      {error ? <div className="error"> {error} </div> : null}
    </div>
  );
}

export default ActivitiesDashboard;
