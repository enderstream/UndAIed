import React, { createContext, useEffect, useState, ReactNode } from "react";
import { Socket, io } from "socket.io-client";
import { useRecoilValue } from "recoil";
import { userState } from "../store/userState";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  connect: () => void;
}

export const SocketContext = createContext<SocketContextType | null>(null);

interface SocketProviderProps {
  children: ReactNode;
  url: string;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({
  children,
  url,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const userData = useRecoilValue(userState);

  const connect = () => {
    if (!userData?.token) {
      return;
    }

    if (socket?.connected) {
      return;
    }

    // 기존 소켓이 있다면 정리
    if (socket) {
      socket.close();
      setSocket(null);
    }

    try {
      // --- 쿼리 파라미터에 auth 필드로 토큰을 담아서 보냄 ---
      const newSocket = io(`${url}/socket.io`, {
        transports: ["websocket"],
        // 여기서 key 이름을 "auth"로 지정 (서버에서도 "auth"로 읽게 됨)
        query: {
          auth: `Bearer ${userData.token}`,
        },
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 10000,
        autoConnect: false,
      });

      newSocket.on("connect", () => {
        setIsConnected(true);
      });

      newSocket.on("connect_error", (error) => {
        console.error("Socket connection error:", error.message);
        setIsConnected(false);
      });

      // newSocket.on("disconnect", (reason) => {
      newSocket.on("disconnect", () => {
        setIsConnected(false);
      });

      newSocket.on("error", (error) => {
        console.error("Socket error:", error);
      });

      newSocket.connect();
      setSocket(newSocket);
    } catch (error) {
      console.error("Error creating socket connection:", error);
      setIsConnected(false);
    }
  };

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (socket) {
        socket.close();
        setSocket(null);
        setIsConnected(false);
      }
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, isConnected, connect }}>
      {children}
    </SocketContext.Provider>
  );
};
