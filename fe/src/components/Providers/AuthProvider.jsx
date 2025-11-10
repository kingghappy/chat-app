import React, { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
 const [user, setUser] = useState(() => {
    const oldUser = localStorage.getItem("user");
    return oldUser ? JSON.parse(oldUser) : null;
  });

  const setAuth = (data) => setUser(data);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const value = {
    user,
    setAuth,
  };
  // 4. Trả về Provider bọc các component con
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
