import { createContext, useState } from "react";

export const WeatherContext = createContext({
  city: "",
  setCity: () => {},
  isLoading: false,
  setIsLoading: () => {},
  error: "",
  setError: () => {},
});

const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState("Dhaka");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const value = { city, setCity, isLoading, setIsLoading, error, setError };
  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};

export default WeatherProvider;
