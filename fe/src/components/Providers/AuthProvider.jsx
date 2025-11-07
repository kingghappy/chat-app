import React, {
  createContext,
  useState,
} from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const setAuth = (data) => setUser(data)

const value = {
  user,
  setAuth
}
  // 4. Trả về Provider bọc các component con
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider
