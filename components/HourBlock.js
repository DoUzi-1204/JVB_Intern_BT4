import { useState } from "react";
import styles from "../styles/HourBlock.module.css";

export default function HourBlock({ hour }) {
  const [expanded, setExpanded] = useState(false);

  const time = new Date(hour.date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={styles["hour-block"]}>
      <div className={styles.summary}>
        <span>{time}</span>
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
