import { useContext, useId, useState } from "react";
import { WeatherContext } from "../context/WeatherContext";

export default function SearchPlace() {
  const { city, setCity, isLoading, setIsLoading, error, setError } =
    useContext(WeatherContext);
  const [input, setInput] = useState("");
  const id = useId();

  const [latLng, setLatLng] = useState({
    lat: 0,
    lng: 0,
  });

  const getCoordinates = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${input}&count=1`
    );

    if (res.status !== 200) {
      setError("Failed to fetch data");
      setIsLoading(false);
      return;
    }

    const data = await res.json();

    if (data?.results?.length > 0) {
      await setLatLng({
        lat: data.results[0].latitude,
        lng: data.results[0].longitude,
      });
    } else {
      setError("Place not found");
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
  };

  const getForecast = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latLng.lat}&longitude=${latLng.lng}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
    );

    if (res.status !== 200) {
      setError("Failed to fetch data");
      setIsLoading(false);
      return;
    }

    const data = await res.json();
    console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await getCoordinates(e);
    await getForecast(e);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex justify-between w-[500px] bg-black-800 border border-gray-700 mt-5 p-3 rounded-md space-x-3"
      >
        <input
          type="text"
          placeholder="Enter City"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          id={id + "-city-input"}
          className="bg-gray-800 border border-gray-500 shadow-2xl focus:border-gray-600 p-2 rounded-md w-full"
        />

        <button
          className="bg-blue-500 text-white p-2 hover:bg-blue-600 rounded-md w-[150px] cursor-pointer"
          type="submit"
        >
          Get Weather
        </button>
      </form>
    </>
  );
}
