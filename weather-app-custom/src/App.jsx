
import { WeatherContext } from "./context/WeatherContext";
import SearchPlace from "./components/SearchPlace";
import { CurrentWeather } from "./components/CurrentWeather";

function App() {


  return (
    <>
      <div className="flex flex-col items-center justify-center p-5 max-w-[600px] mx-auto w-auto">
        <div className="font-bold text-3xl">Weather Forecast</div>

        <SearchPlace />

        <CurrentWeather />
      </div>
    </>
  );
}

export default App;
