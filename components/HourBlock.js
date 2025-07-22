import { useState } from "react";
import styles from "../styles/HourBlock.module.css";

export default function HourBlock({ hour }) {
  const [expanded, setExpanded] = useState(false);

  const time = hour.date.split(" ")[1]; // "00:00"

  return (
    <div className={styles["hour-block"]}>
      <div className={styles.summary}>
        <span>{time}</span>
        {/* Thêm icon + text */}
        <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <img
            src={`https:${hour.icon}`}
            alt={hour.weather}
            width={32}
            height={32}
          />
          <span>{hour.weather}</span>
        </span>
        <span>🌡 {hour.temp_c}°C</span>
        <span>💧 {hour.humidity}%</span>
        <span>☀️ {hour.uv}</span>
        <span>💨 {hour.windSpeed_kph ?? "--"} km/h</span>
        <button onClick={() => setExpanded(!expanded)}>
          {expanded ? "▲" : "▼"}
        </button>
      </div>

      {expanded && (
        <div className={styles.details}>
          <div>🧭 Pressure: {hour.pressure_mb} mb</div>
          <div>🌫 Cloud: {hour.cloud}%</div>
          <div>💧 Precip: {hour.precip_mm} mm</div>
          <div>🌧 Rain: {hour.chance_of_rain}%</div>
          <div>❄️ Snow: {hour.chance_of_snow}%</div>
          <div>👁 Vis: {hour.vis_km} km</div>
          <div>💨 Gust: {hour.gust_mph} mph</div>
          <div>💧 Dew Point: {hour.dewpoint_c}°C</div>
        </div>
      )}
    </div>
  );
}
