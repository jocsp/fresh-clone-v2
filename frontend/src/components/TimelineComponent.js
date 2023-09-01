import React from "react";
import { formatDate } from "../scripts/formatDate";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  timelineItemClasses,
} from "@mui/lab";
import { Link } from "react-router-dom";

const TimelineComponent = ({ tickets }) => {
  return (
    <div className="timeline-container m-top-20">
      <p className="lighter-font">Timeline</p>
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {tickets.reverse().map((ticket, index) => {
          let timelineItem;
          index += 1;
          if ((index === tickets.length) & (tickets.length <= 5)) {
            timelineItem = (
              <TimelineItem key={ticket._id}>
                <TimelineSeparator>
                  <TimelineDot color="inherit" variant="outlined">
                    <ConfirmationNumberOutlinedIcon />
                  </TimelineDot>
                </TimelineSeparator>

                <TimelineContent>
                  <Link
                    reloadDocument={true}
                    to={`/ticket/${ticket.ticket_number}`}
                  >
                    <p className="fs-14">{ticket.subject}</p>
                    <p className="fs-14">#{ticket.ticket_number}</p>

                    <p className="small-lighter fs-13">
                      {formatDate(ticket.date)}
                    </p>

                    <p className="small-lighter fs-13 ">
                      Status: {ticket.status.name}
                    </p>
                  </Link>
                </TimelineContent>
              </TimelineItem>
            );
          } else if ((index === tickets.length) & (tickets.length > 5)) {
            timelineItem = (
              <TimelineItem key={ticket._id}>
                <TimelineSeparator>
                  <TimelineDot color="inherit" variant="outlined">
                    <MoreHorizOutlinedIcon />
                  </TimelineDot>
                </TimelineSeparator>

                <TimelineContent className="flex">
                  View all activity
                </TimelineContent>
              </TimelineItem>
            );
          } else {
            timelineItem = (
              <TimelineItem key={ticket._id}>
                <TimelineSeparator>
                  <TimelineDot color="inherit" variant="outlined">
                    <ConfirmationNumberOutlinedIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>

                <TimelineContent>
                  <Link
                    reloadDocument={true}
                    to={`/ticket/${ticket.ticket_number}`}
                  >
                    <p className="fs-14">{ticket.subject}</p>
                    <p className="fs-14">#{ticket.ticket_number}</p>

                    <p className="small-lighter fs-13">
                      {formatDate(ticket.date)}
                    </p>

                    <p className="small-lighter fs-13 ">
                      Status: {ticket.status.name}
                    </p>
                  </Link>
                </TimelineContent>
              </TimelineItem>
            );
          }

          return timelineItem;
        })}
      </Timeline>
    </div>
  );
};

export default TimelineComponent;
