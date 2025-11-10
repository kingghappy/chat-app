// src/context/SocketContext.jsx

import React, { useContext } from "react";


import { SocketContext } from "../../components/Providers/SocketProvider";
// 1. Tạo Context

// 2. Tạo một custom Hook (để dễ sử dụng)
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
