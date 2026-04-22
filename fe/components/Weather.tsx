"use client";

import { useEffect, useState } from "react";

type WeatherType = {
  temperature: number;
  windspeed: number;
};

export default function Weather() {
  const [weather, setWeather] = useState<WeatherType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=21.0285&longitude=105.8542&current_weather=true"
        );

        const data = await res.json();

        setWeather(data.current_weather);
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) return <p>Đang tải...</p>;

  return (
    <div>
      <h2>Thời tiết Hà Nội</h2>

      {weather && (
        <>
          <p>Nhiệt độ: {weather.temperature}°C</p>
          <p>Gió: {weather.windspeed} km/h</p>
        </>
      )}
    </div>
  );
}