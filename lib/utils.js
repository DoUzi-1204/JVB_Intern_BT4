const months = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Ago",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dic",
};
const days = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
};

/**
 *
 * @param {date} date
 * @returns string 08:24 AM
 */
function formatAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const strTime = `${hours}:${minutes} ${ampm}`;
  return strTime;
}

export function getFormattedDate(d) {
  const date = new Date(d);
  const month = months[date.getMonth()];
  return `${month} ${date.getDate()}`;
}
export function getFormattedFullDate(d) {
  const date = new Date(d);
  const month = months[date.getMonth()];
  const day = days[date.getDay()];
  return `${formatAMPM(
    date
  )}, ${day}, ${month} ${date.getDate()}, ${date.getFullYear()}`;
}
