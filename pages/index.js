import { useEffect, useState } from "react";
import Chart from "../components/Chart";
import DailyCards from "../components/DailyCards";
import Input from "../components/Input";
import MainCard from "../components/MainCard";
import { unknownWeather } from "../lib/defaultData";
import Seo from "../components/Seo";
import WeatherDetailModal from "../components/WeatherDetailModal";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [search, setSearch] = useState("Hanoi");
  const [cityInfo, setCityInfo] = useState({
    name: "Hanoi",
    country: "VN",
    timeZone: "Asia/Bangkok",
  });
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [selectedCard, setSelectedCard] = useState(0);
  const [chartType, setChartType] = useState("temp");
  const [currentWeather, setCurrentWeather] = useState();
  const [dailyWeather, setDailyWeather] = useState([]);
  const [todayHourlyWeather, setTodayHourlyWeather] = useState([]);
  const [error, setError] = useState("");
  const [detailVisible, setDetailVisible] = useState(false);
  const [detailDate, setDetailDate] = useState("");
  const [detailData, setDetailData] = useState([]);

  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        if (isInitialLoad) setLoading(true);
        setError("");

        const res = await fetch(
          `/api/weather?city=${encodeURIComponent(search)}`
        );
        const {
          cityInfo: newCityInfo,
          currentWeather,
          dailyWeather,
          todayHourlyWeather,
        } = await res.json();

        if (!newCityInfo || !currentWeather || !dailyWeather)
          throw new Error("Incomplete data");

        setCityInfo(newCityInfo);
        setCurrentWeather(currentWeather);
        setDailyWeather(dailyWeather);
        setTodayHourlyWeather(todayHourlyWeather || []);
      } catch (err) {
        setError("Not Found");
        setCurrentWeather(null);
        setDailyWeather([]);
        setTodayHourlyWeather([]);
      } finally {
        if (isInitialLoad) {
          setLoading(false);
          setIsInitialLoad(false);
        }
      }
    };

    fetchWeather();
  }, [search]);

  useEffect(() => {
    const extractValues = (source, field) =>
      source.map((h) => h[field] ?? null);

    if (selectedCard === 0 && todayHourlyWeather.length > 0) {
      const values = extractValues(
        todayHourlyWeather,
        chartType === "temp" ? "temp_c" : chartType
      );
      setData(values);
      setLabels(
        todayHourlyWeather.map(
          (h) => new Date(h.date).getHours().toString().padStart(2, "0") + ":00"
        )
      );
    } else {
      const day = dailyWeather[selectedCard - 1];
      if (day?.hours) {
        const values = extractValues(
          day.hours,
          chartType === "temp" ? "temp_c" : chartType
        );
        setData(values);
        setLabels(
          day.hours.map(
            (h) =>
              new Date(h.date).getHours().toString().padStart(2, "0") + ":00"
          )
        );
      } else {
        setData([]);
        setLabels([]);
      }
    }
  }, [selectedCard, todayHourlyWeather, dailyWeather, chartType]);

  function handleDoubleClick(dayIndex) {
    const selectedDay =
      dayIndex === 0
        ? { date: new Date(), hours: todayHourlyWeather }
        : dailyWeather[dayIndex - 1];

    if (selectedDay) {
      const hoursWithTimeZone = (selectedDay.hours || []).map((h) => ({
        ...h,
        timeZone: cityInfo?.tz_id || "UTC",
      }));

      setDetailDate(
        new Date(selectedDay.date).toLocaleDateString("en-GB", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );

      setDetailData(hoursWithTimeZone);
      setDetailVisible(true);
    }
  }

  const displayWeather =
    selectedCard === 0
      ? currentWeather || unknownWeather
      : dailyWeather[selectedCard - 1] || unknownWeather;

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>
        <Seo />
        <div className={styles.input}>
          <Input
            cityInfo={cityInfo}
            setSearch={setSearch}
            setCityInfo={setCityInfo}
            error={error}
            setError={setError}
          />
        </div>
        <div className={styles.mainCard}>
          <MainCard
            currentWeather={currentWeather}
            cityInfo={cityInfo}
            displayWeather={displayWeather}
            hideTime={selectedCard > 0}
          />
        </div>
        <div className={styles.chart}>
          <div className={styles.chartButtons}>
            <button
              className={chartType === "temp" ? styles.active : ""}
              onClick={() => setChartType("temp")}
            >
              Temperature
            </button>
            <button
              className={chartType === "humidity" ? styles.active : ""}
              onClick={() => setChartType("humidity")}
            >
              Humidity
            </button>
            <button
              className={chartType === "uv" ? styles.active : ""}
              onClick={() => setChartType("uv")}
            >
              UV Index
            </button>
          </div>
          <Chart data={data} labels={labels} type={chartType} />
        </div>
        <div className={styles.dailyCards}>
          <DailyCards
            dailyWeather={dailyWeather}
            currentWeather={currentWeather}
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
            onDoubleClick={handleDoubleClick}
          />
        </div>
      </main>

      <WeatherDetailModal
        visible={detailVisible}
        onClose={() => setDetailVisible(false)}
        data={detailData}
        date={detailDate}
        timeZone={cityInfo?.tz_id}
      />
    </div>
  );
}
