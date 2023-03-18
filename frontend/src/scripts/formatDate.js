import { format, formatDistanceStrict } from "date-fns";

export function formatDate(date) {
  const dateObject = new Date(date);

  const dateString =
    formatDistanceStrict(dateObject, new Date(), {
      addSuffix: true,
    }) +
    " " +
    format(dateObject, "'('eee, d MMM y 'at' p')'");

  return dateString;
}

export function timeAgo(date) {
  const dateObject = new Date(date);

  const dateString = formatDistanceStrict(dateObject, new Date(), {
    addSuffix: true,
  });

  return dateString;
}
