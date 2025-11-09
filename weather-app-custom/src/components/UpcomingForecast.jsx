import { describeWeatherCode, getWeatherIcon } from "../utils/weatherCodes";

export const UpcomingForecast = () => {
  return (
    <div className="mt-5 w-[600px]">
      <div className="w-full flex justify-start">
        <p className="text-start">Upcoming Forecast</p>
      </div>

      <div className="w-full grid grid-cols-3 gap-3 mt-4">
        <Forecast />
        <Forecast />
        <Forecast />
        <Forecast />
      </div>
    </div>
  );
};

const Forecast = () => {
  return (
    <div className="border border-gray-700 shadow-md flex justify-between items-center p-2 rounded-md">
      <div className="flex flex-col justify-start items-start">
        <p className="text-center text-sm">Sat, Nov 8</p>
        <p className="text-sm text-gray-400">{describeWeatherCode(0)} </p>
      </div>

      <div className="flex justify-between items-center space-x-2">
        <p className="text-2xl">{getWeatherIcon(0)}</p>
        <div className="flex flex-col justify-start items-start">
          <p className="text-sm font-bold">50</p>
          <p className="text-xs font-light">50</p>
        </div>
      </div>
    </div>
  );
};
