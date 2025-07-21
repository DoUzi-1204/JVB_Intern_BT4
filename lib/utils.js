const months = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug", // 👈 Sửa "Ago" thành "Aug"
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec", // 👈 Sửa "Dic" thành "Dec"
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
 * Format giờ phút thành AM/PM theo giờ Việt Nam
 * @param {Date|string} dateInput
 * @returns string 08:24 AM
 */
function formatAMPM(dateInput) {
  const date = new Date(dateInput);
  const timeString = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Ho_Chi_Minh", // 👈 Fix múi giờ
  });
  return timeString;
}

/**
 * Trả về định dạng ngày rút gọn: "Jul 21"
 * @param {Date|string} d
 * @returns string
 */
export function getFormattedDate(d) {
  const date = new Date(d);
  const monthIndex = new Date(
    date.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
  ).getMonth();
  const day = new Date(
    date.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
  ).getDate();

  const month = months[monthIndex];
  return `${month} ${day}`;
}

/**
 * Trả về định dạng đầy đủ: "08:24 AM, Sun, Jul 21, 2025"
 * @param {Date|string} d
 * @returns string
 */
export function getFormattedFullDate(d) {
  const date = new Date(d);
  const localDate = new Date(
    date.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
  );

  const time = formatAMPM(localDate);
  const day = days[localDate.getDay()];
  const month = months[localDate.getMonth()];
  const dayNum = localDate.getDate();
  const year = localDate.getFullYear();

  return `${time}, ${day}, ${month} ${dayNum}, ${year}`;
}
