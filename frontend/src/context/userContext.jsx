import { createContext } from "react";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const value = {
    serverUrl: "http://localhost:8000",
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
