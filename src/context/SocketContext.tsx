import React, { EffectCallback, useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../data/const";
import { io, Socket } from "socket.io-client";
import { UserContext } from "./UserContext";
import { ConversationMessageProps } from "./ConversationsProvider";

interface SocketIOContextData {
  socket: Socket | null;
  sendMessage: (message: ConversationMessageProps) => void;
}

interface Props {
  children: JSX.Element;
}

const SocketIOContext = React.createContext<SocketIOContextData>({
  socket: null,
  sendMessage: () => {}
});

export function useSocket() {
  return useContext(SocketIOContext);
}

const SocketProvider = (props: Props) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { userData } = useContext(UserContext);

  useEffect((): ReturnType<EffectCallback> => {
    if (userData) {
      const newSocket = io(`${API_BASE_URL}/relay`, {
        query: { userId: userData.id.toString() },
      });
      setSocket(newSocket);
      return (): void => {
        newSocket.close();
      };
    }
  }, [userData]);

  const sendMessage = (message: ConversationMessageProps) => {
    if (socket) {
      socket.emit("send-message", { message });
    }
  };

  return (
    <SocketIOContext.Provider value={{ socket, sendMessage }}>
      {props.children}
    </SocketIOContext.Provider>
  );
};

export default SocketProvider;
