import React from "react";
import { formatDate } from "../../scripts/formatDate";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { Link } from "react-router-dom";
import TimelineItem from "./TimelineItem";
import TimelineSeparator from "./TimelineSeparator";
import TimelineDot from "./TimelineDot";
import TimelineConnector from "./TimelineConnector";
import TimelineContent from "./TimelineContent";

const Timeline = ({ tickets, limit }) => {
  return (
    <div className="timeline-container m-top-20">
      <p className="lighter-font">Timeline</p>
      <div className="timeline m-top-20">
        {tickets.map((ticket, index, extended = false) => {
          index += 1;

          if (index > limit + 1) return;

          let timelineItem;
          const timelineContent = (
            <>
              <p className="fs-14">{ticket.subject}</p>
              <p className="fs-14 m-top-5">#{ticket.ticket_number}</p>

              <p className="small-lighter fs-13 m-top-10">
                {formatDate(ticket.date)}
              </p>

              <p className="small-lighter fs-13 m-top-5 m-bottom-10">
                Status: {ticket.status.name}
              </p>
            </>
          );
          if (index === tickets.length && tickets.length <= limit) {
            timelineItem = (
              <TimelineItem key={ticket._id}>
                <TimelineSeparator>
                  <TimelineDot>
                    <ConfirmationNumberOutlinedIcon />
                  </TimelineDot>
                </TimelineSeparator>

                <TimelineContent>
                  <Link
                    // reloadDocument={true}
                    to={`/ticket/${ticket.ticket_number}`}
                  >
                    {timelineContent}
                  </Link>
                </TimelineContent>
              </TimelineItem>
            );
          } else if (index === limit + 1) {
            timelineItem = (
              <TimelineItem key={ticket._id}>
                <TimelineSeparator>
                  <TimelineDot>
                    <MoreHorizOutlinedIcon />
                  </TimelineDot>
                </TimelineSeparator>

                <TimelineContent>
                  <Link> View all activity </Link>
                </TimelineContent>
              </TimelineItem>
            );
          } else {
            timelineItem = (
              <TimelineItem key={ticket._id}>
                <TimelineSeparator>
                  <TimelineDot>
                    <ConfirmationNumberOutlinedIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>

                <TimelineContent>
                  <Link
                    // reloadDocument={true}
                    to={`/ticket/${ticket.ticket_number}`}
                  >
                    {timelineContent}
                  </Link>
                </TimelineContent>
              </TimelineItem>
            );
          }

          return timelineItem;
        })}
      </div>
    </div>
  );
};

// {
//   tickets.reverse().map((ticket) => {
//     return (
//       <TimelineItem key={ticket._id}>
//         <TimelineSeparator>
//           <TimelineDot></TimelineDot>
//           <TimelineConnector />
//         </TimelineSeparator>
//         <TimelineContent>
//           <p className="fs-14">{ticket.subject}</p>
//           <p className="fs-14 m-top-5">#{ticket.ticket_number}</p>

//           <p className="small-lighter fs-13 m-top-10">
//             {formatDate(ticket.date)}
//           </p>

//           <p className="small-lighter fs-13 m-top-5 m-bottom-10">
//             Status: {ticket.status.name}
//           </p>
//         </TimelineContent>
//       </TimelineItem>
//     );
//   });
// }

export default Timeline;
