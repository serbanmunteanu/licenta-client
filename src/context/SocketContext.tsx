import React, { EffectCallback, useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../data/const";
import { io, Socket } from 'socket.io-client';
import { UserContext } from "./UserContext";

interface SocketIOContextData {
    socket: Socket | null;
}

interface Props {
    children: JSX.Element;
}

const SocketIOContext = React.createContext<SocketIOContextData>({
    socket: null
});

const SocketProvider = (props: Props) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const { userData } = useContext(UserContext);

    useEffect((): ReturnType<EffectCallback> => {
        if (userData) {
            const newSocket = io(
                `${API_BASE_URL}/relay`,
                { query: { userId: userData.id.toString() }}
            );
            setSocket(newSocket);
            return (): void => { newSocket.close() };
        }
    },[userData])

    return (
        <SocketIOContext.Provider value={{socket}}>
            {props.children}
        </SocketIOContext.Provider>
    );
}

export default SocketProvider;