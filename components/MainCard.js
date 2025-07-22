import { useEffect, useState } from "react";
import { getFormattedFullDate } from "../lib/utils";
import styles from "../styles/MainCard.module.css";

const MainCard = ({ displayWeather, cityInfo, hideTime = false }) => {
  const [unit, setUnit] = useState("C");
  const [localTime, setLocalTime] = useState(new Date());

  useEffect(() => {
    if (!hideTime) {
      const timer = setInterval(() => {
        setLocalTime(new Date()); // luôn dùng giờ hệ thống
      }, 60 * 1000); // cập nhật mỗi phút
      return () => clearInterval(timer);
    }
  }, [hideTime]);

  const {
    date,
    icon,
    temp_c,
    temp_f,
    weather,
    humidity,
    windSpeed_kph,
    windSpeed_mph,
    uv,
  } = displayWeather;

  const temp = unit === "C" ? temp_c : temp_f;
  const windSpeed = unit === "C" ? windSpeed_kph : windSpeed_mph;
  const windUnit = unit === "C" ? "km/hr" : "mph";

  const tzId = cityInfo?.tz_id || "UTC";

  const formattedDate = hideTime
    ? getFormattedFullDate(date || Date(), tzId, true)
    : `${new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: tzId,
      }).format(localTime)}, ${new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: tzId,
      }).format(localTime)}`;

  return (
    <div className={styles["main-card"]}>
      <p className={styles["main-card__city"]}>
        {cityInfo?.name}, {cityInfo?.country}
      </p>

      <p className={styles["main-card__date"]}>{formattedDate}</p>

      <div className={styles["main-card__temp-block"]}>
        <img
          className={styles["main-card__icon"]}
          src={
            icon?.includes("cdn.weatherapi.com")
              ? `https:${icon}`
              : `/icons/${icon}.png`
          }
          alt={weather || "weather icon"}
        />
        <span className={styles["main-card__temp"]}>
          {temp} <sup>°{unit}</sup>
        </span>
      </div>

      <p className={styles["main-card__weather"]}>{weather}</p>

      <section className={styles["main-card__details"]}>
        <div className={styles["main-card__detail-item"]}>
          <span className={styles["main-card__label"]}>Humidity</span>
          <p>{humidity}%</p>
        </div>
        <div className={styles["main-card__detail-item"]}>
          <span className={styles["main-card__label"]}>Wind Speed</span>
          <p>
            {windSpeed} {windUnit}
          </p>
        </div>
        <div className={styles["main-card__detail-item"]}>
          <span className={styles["main-card__label"]}>UV Index</span>
          <p>{uv ?? "--"}</p>
        </div>
      </section>

      <button
        onClick={() => setUnit(unit === "C" ? "F" : "C")}
        className={styles["main-card__toggle-btn"]}
      >
        Switch to °{unit === "C" ? "F" : "C"}
      </button>
    </div>
  );
};

export default MainCard;
