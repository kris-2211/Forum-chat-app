import { createContext, useState, useEffect } from "react";
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedToken) {
      setToken(storedToken);
    }

    setTimeout(() => {
      setIsInitialized(true);
    }, 1000); // Mark initialization as complete
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, token, setToken, isInitialized }}
    >
      {children}
    </UserContext.Provider>
  );
};
export { UserContext, UserProvider };
