const months = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
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
 * Định dạng giờ/phút dạng 08:24 AM theo múi giờ tz_id
 * @param {string | Date} dateInput
 * @param {string} tzId - múi giờ, ví dụ "Asia/Bangkok"
 * @returns {string}
 */
export function formatAMPM(dateInput, tzId) {
  const date = new Date(dateInput);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: tzId,
  });
}

/**
 * Trả về định dạng ngày rút gọn: "Jul 21"
 * @param {string | Date} dateInput
 * @param {string} tzId
 * @returns {string}
 */
export function getFormattedDate(dateInput, tzId) {
  const date = new Date(
    new Date(dateInput).toLocaleString("en-US", { timeZone: tzId })
  );
  const month = months[date.getMonth()];
  const day = date.getDate();
  return `${month} ${day}`;
}

/**
 * Trả về định dạng đầy đủ: "08:24 AM, Sun, Jul 21, 2025"
 * Có thể ẩn giờ nếu hideTime = true
 *
 * @param {string | Date} dateInput
 * @param {string} tzId - múi giờ
 * @param {boolean} hideTime - nếu true thì không hiển thị giờ
 * @returns {string}
 */
export function getFormattedFullDate(dateInput, tzId, hideTime = false) {
  const date = new Date(
    new Date(dateInput).toLocaleString("en-US", { timeZone: tzId })
  );

  const time = formatAMPM(date, tzId);
  const day = days[date.getDay()];
  const month = months[date.getMonth()];
  const dayNum = date.getDate();
  const year = date.getFullYear();

  return hideTime
    ? `${day}, ${month} ${dayNum}, ${year}`
    : `${time}, ${day}, ${month} ${dayNum}, ${year}`;
}
