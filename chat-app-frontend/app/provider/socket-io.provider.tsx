"use client";

import React from "react";
import io, { Socket } from "socket.io-client";

export const SocketIoContext = React.createContext<{ socket: Socket | null }>({
  socket: null,
});

interface ISocketIoProviderProps {
  children: JSX.Element | JSX.Element[] | React.ReactNode;
}
export const SocketIoProvider: React.FC<ISocketIoProviderProps> = ({
  children,
}) => {
  const [socket, setSocket] = React.useState<Socket | null>(null);

  React.useEffect(() => {
    if (!!socket) return;
    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL, {
      transports: ["websocket"],
      upgrade: false,
    });
    setSocket(newSocket);

    return () => {
      newSocket.close();
      setSocket(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SocketIoContext.Provider value={{ socket }}>
      {children}
    </SocketIoContext.Provider>
  );
};
