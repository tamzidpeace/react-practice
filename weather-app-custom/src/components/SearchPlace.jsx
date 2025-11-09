import { useContext, useId } from "react";
import { WeatherContext } from "../context/WeatherContext";

export default function SearchPlace() {
      const { city, setCity } = useContext(WeatherContext);
      const id = useId();
  return (
    <>
      <form className="flex justify-between w-[500px] bg-black-800 border border-gray-700 mt-5 p-3 rounded-md space-x-3">
        <input
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
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
