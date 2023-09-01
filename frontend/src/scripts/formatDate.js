import { format, formatDistanceStrict } from "date-fns";

export function formatDateAgo(date) {
  const dateObject = new Date(date);

  const dateString = `${formatDistanceStrict(dateObject, new Date(), {
    addSuffix: true,
  })} ${format(dateObject, "'('eee, d MMM y', ' p')'")}`;

  return dateString;
}

export function formatDate(date) {
  const dateObject = new Date(date);

  return format(dateObject, "d MMM y', ' p");
}

export function timeAgo(date) {
  const dateObject = new Date(date);

  const dateString = formatDistanceStrict(dateObject, new Date(), {
    addSuffix: true,
  });

  return dateString;
}
