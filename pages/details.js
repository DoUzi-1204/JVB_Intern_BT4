import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const { city = "Hanoi", day = 0 } = context.query;
  const protocol = context.req.headers["x-forwarded-proto"] || "http";
  const host = context.req.headers.host;

  const res = await fetch(`${protocol}://${host}/api/weather?city=${city}`);
  const weather = await res.json();

  return {
    props: {
      city,
      dayIndex: Number(day),
      dayData: day == 0 ? null : weather.dailyWeather[day - 1], // vì day[0] là hôm nay
      todayData: weather.todayHourlyWeather,
    },
  };
}

export default function DetailPage({ city, dayIndex, dayData, todayData }) {
  const hourly = dayIndex === 0 ? todayData : dayData?.hours || [];

  return (
    <div>
      <h2>
        Weather in {city} — Day {dayIndex}
      </h2>
      <div style={{ maxHeight: "600px", overflowY: "scroll" }}>
        {hourly.map((h, idx) => (
          <div
            key={idx}
            style={{
              border: "1px solid #ccc",
              margin: "8px",
              padding: "8px",
              borderRadius: "8px",
            }}
          >
            <strong>{h.time}</strong>
            <p>🌡 Temp: {h.temp_c}°C</p>
            <p>💧 Humidity: {h.humidity}%</p>
            <p>☀️ UV: {h.uv}</p>
            <p>💨 Wind: {h.windSpeed_kph} kph</p>
          </div>
        ))}
      </div>
    </div>
  );
}
