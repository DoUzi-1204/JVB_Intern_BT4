import { useEffect, useState } from "react";
import { getFormattedDate } from "../lib/utils";
import styles from "../styles/MiniCard.module.css";

const MiniCard = ({
  data,
  selectedCard,
  setSelectedCard,
  i,
  onDoubleClick,
}) => {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(selectedCard === i);
  }, [selectedCard, i]);

  function handleClick(e) {
    e.preventDefault();
    setSelectedCard(i);
  }

  function handleDoubleClick(e) {
    e.preventDefault();
    if (onDoubleClick) {
      onDoubleClick(i);
    }
  }

  if (!data) {
    data = {
      icon: "unknown",
      humidity: "--",
      date: Date.now(),
      timeZone: "UTC",
    };
  }

  const iconSrc = data.icon?.includes("cdn.weatherapi.com")
    ? `https:${data.icon}`
    : `/icons/${data.icon}.png`;

  const dateLabel =
    i === 0 ? "Today" : getFormattedDate(data.date, data.timeZone || "UTC");

  return (
    <button
      className={`${styles["mini-card"]} ${selected ? styles.selected : ""}`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <p className={styles["mini-card-date"]}>
        <strong>{dateLabel}</strong>
      </p>
      <img
        className={styles["mini-card-icon"]}
        src={iconSrc}
        alt="weather icon"
      />
      <p className={styles["mini-card-label"]}>Humidity</p>
      <p className={styles["mini-card-humidity"]}>{data.humidity ?? "--"}%</p>
    </button>
  );
};

export default MiniCard;
