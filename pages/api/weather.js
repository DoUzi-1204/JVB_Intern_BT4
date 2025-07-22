const API_BASE = "https://api.weatherapi.com/v1/forecast.json";

async function getForecastByCity(city) {
  try {
    const url = `${API_BASE}?key=${process.env.WEATHER_API_KEY}&q=${city}&days=3&aqi=no&alerts=no`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching forecast:", err);
    throw err;
  }
}

const mapWeatherAPIData = (data) => {
  const { location, current, forecast } = data;

  const cityInfo = {
    name: location.name,
    country: location.country,
    tz_id: location.tz_id, //  giữ đúng tên gốc từ API
  };

  const currentWeather = {
    date: current.last_updated, //  giữ chuỗi ISO từ API
    temp_c: current.temp_c,
    temp_f: current.temp_f,
    weather: current.condition.text,
    icon: current.condition.icon,
    humidity: current.humidity,
    windSpeed_kph: current.wind_kph,
    windSpeed_mph: current.wind_mph,
    uv: current.uv,
  };

  const today = forecast.forecastday[0];
  const todayHourlyWeather = today.hour.map((hour) => ({
    date: hour.time,
    temp_c: hour.temp_c,
    temp_f: hour.temp_f,
    weather: hour.condition.text,
    icon: hour.condition.icon,
    humidity: hour.humidity,
    windSpeed_kph: hour.wind_kph,
    windSpeed_mph: hour.wind_mph,
    uv: hour.uv,
    pressure_mb: hour.pressure_mb,
    cloud: hour.cloud,
    precip_mm: hour.precip_mm,
    chance_of_rain: hour.chance_of_rain,
    chance_of_snow: hour.chance_of_snow,
    vis_km: hour.vis_km,
    gust_mph: hour.gust_mph,
    dewpoint_c: hour.dewpoint_c,
  }));

  const dailyWeather = forecast.forecastday.slice(1).map((day) => {
    const hours = day.hour.map((hour) => ({
      date: hour.time,
      temp_c: hour.temp_c,
      temp_f: hour.temp_f,
      weather: hour.condition.text,
      icon: hour.condition.icon,
      humidity: hour.humidity,
      windSpeed_kph: hour.wind_kph,
      windSpeed_mph: hour.wind_mph,
      uv: hour.uv,
      pressure_mb: hour.pressure_mb,
      cloud: hour.cloud,
      precip_mm: hour.precip_mm,
      chance_of_rain: hour.chance_of_rain,
      chance_of_snow: hour.chance_of_snow,
      vis_km: hour.vis_km,
      gust_mph: hour.gust_mph,
      dewpoint_c: hour.dewpoint_c,
    }));

    return {
      date: day.date,
      temp_c: day.day.avgtemp_c,
      temp_f: day.day.avgtemp_f,
      weather: day.day.condition.text,
      icon: day.day.condition.icon,
      humidity: day.day.avghumidity,
      windSpeed_kph: day.day.maxwind_kph,
      windSpeed_mph: day.day.maxwind_mph,
      uv: day.day.uv,
      hours,
    };
  });

  return {
    cityInfo,
    currentWeather,
    dailyWeather,
    todayHourlyWeather,
  };
};

export default async function handler(req, res) {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ message: "Missing city parameter" });
  }

  try {
    const data = await getForecastByCity(city);
    const mapped = mapWeatherAPIData(data);
    return res.status(200).json(mapped);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch weather data" });
  }
}
