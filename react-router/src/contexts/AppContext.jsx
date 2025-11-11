import { createContext, useState } from "react";

const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
    const [name, setName] = useState("John Doe");

    const value = {
        name,
        setName,
    };
    return (
        <AppContext.Provider value={value}>{children}</AppContext.Provider>
    );
}

export default AppContext

