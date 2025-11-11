// SocketProvider.tsx
import { useEffect, useState, createContext } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../../store/context/AuthContext";

// eslint-disable-next-line react-refresh/only-export-components
export const SocketContext = createContext(null);


export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) { socket?.close(); setSocket(null); setOnlineUsers([]); return; }

    const s = io("https://be.kinghappy.id.vn", {
      withCredentials: true,        // ưu tiên WS, tránh polling bị CDN can thiệp
      path: "/socket.io",           // default, ghi rõ cho chắc
      query: { userId: user.sub },
      reconnectionAttempts: 5,
    });

    s.on("connect", () => console.log("socket connected", s.id));
    s.on("updateOnlineUsers", (ids) => setOnlineUsers(ids));
    s.on("disconnect", () => console.log("socket disconnected"));

    setSocket(s);
    return () => { s.close(); setSocket(null); };
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
