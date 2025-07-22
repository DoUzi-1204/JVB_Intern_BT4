import HourBlock from "./HourBlock";
import styles from "../styles/WeatherDetailModal.module.css";

export default function WeatherDetailModal({
  visible,
  onClose,
  data = [],
  date,
  timeZone = "UTC", // <== thêm props timeZone
}) {
  if (!visible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Details for {date}</h2>
          <button className={styles.close} onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={styles.content}>
          {data.map((hour, index) => (
            <HourBlock key={index} hour={{ ...hour, timeZone }} />
          ))}
        </div>
      </div>
    </div>
  );
}
