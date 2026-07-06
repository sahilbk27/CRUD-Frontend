import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("tdc_token"));
  const [username, setUsername] = useState(() => localStorage.getItem("tdc_username"));

  useEffect(() => {
    if (token) {
      localStorage.setItem("tdc_token", token);
    } else {
      localStorage.removeItem("tdc_token");
    }
  }, [token]);

  const login = (newToken, newUsername) => {
    setToken(newToken);
    setUsername(newUsername);
    localStorage.setItem("tdc_username", newUsername);
  };

  const logout = () => {
    setToken(null);
    setUsername(null);
    localStorage.removeItem("tdc_username");
  };

  return (
    <AuthContext.Provider value={{ token, username, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
