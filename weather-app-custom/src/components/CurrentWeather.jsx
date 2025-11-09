import { describeWeatherCode, getWeatherIcon } from "../utils/weatherCodes";

export const CurrentWeather = () => {
  return (
    <div className="flex flex-col items-center w-[600px] bg-black-800 border border-gray-700 mt-5 p-3 rounded-md space-x-3">
      <p className="text-sm text-gray-400">Now in</p>

      <p className="text-2xl font-bold">Dhaka</p>

      <p className="text-5xl font-bold">{getWeatherIcon(0)}</p>

      <p className="text-2xl font-bold">25°C</p>

      <p className="text-sm text-gray-400">{describeWeatherCode(0)} </p>

      <div className="flex justify-between space-x-3 items-center w-full">
        <CurrentWeatherInfo />
        <CurrentWeatherInfo />
        <CurrentWeatherInfo />
      </div>
    </div>
  );
};

const CurrentWeatherInfo = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center bg-black-800 border border-gray-700 mt-5 p-3 rounded-md space-x-3">
      <p className="text-sm text-gray-400">Clear Sky</p>
      <p className="text-2xl font-bold">25°C</p>
    </div>
  );
};
