import React, { useEffect, useRef } from "react";
import { API_BASE_URL } from "../data/const";
import { useLocation } from "react-router";

const io = require('socket.io-client');

interface SocketIOContextData {
    socket: typeof io | null;
    connect: () => void;
    disconnect: () => void;
}

interface Props {
    children: JSX.Element;
}

export const SocketIOContext = React.createContext<SocketIOContextData>({
    socket: null,
    connect: () => {},
    disconnect: () => {}
});

const SocketProvider = (props: Props) => {
    const socket = useRef<typeof io>(null);
    const location = useLocation()

    useEffect(() => {
        socket.current = io(`${API_BASE_URL}/relay`, {
            autoConnect: false
        });

        return () => {
            if (socket) {
                socket.current.disconnect();
            }
        }
    },[]);

    useEffect(() => {
        if (location.pathname !== '/') {
          
        }
    }, [location]);

    const connect = () => {
        socket.current.connect();
    }

    const disconnect = () => {
        socket.current.disconnect();
    }

    return (
        <SocketIOContext.Provider value={{
            socket,
            connect,
            disconnect,
        }}>
            {props.children}
        </SocketIOContext.Provider>
    );
}

export default SocketProvider;