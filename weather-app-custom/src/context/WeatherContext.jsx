import { createContext, useState } from "react";

export const WeatherContext = createContext({
  city: "",
  setCity: () => {},
});

const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState("Dhaka");

  const value = { city, setCity };
  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;