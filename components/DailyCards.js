import { unknownWeather } from "../lib/defaultData";
import MiniCard from "./MiniCard";
import styles from "../styles/DailyCards.module.css"; // 👈 đúng đường dẫn từ components

export default function DailyCards({
  dailyWeather,
  currentWeather,
  setSelectedCard,
  selectedCard,
  onDoubleClick,
}) {
  return (
    <div className={styles.dailyCardsContainer}>
      {[0, 1, 2].map((i) => {
        const weatherData =
          i === 0 ? currentWeather : dailyWeather[i - 1] || unknownWeather;

        return (
          <MiniCard
            key={i}
            data={weatherData}
            i={i}
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
            onDoubleClick={onDoubleClick}
          />
        );
      })}
    </div>
  );
}
