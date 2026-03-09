import React, { useEffect, useMemo, useState } from 'react';
import { io, } from 'socket.io-client';
import { SocketContext } from '../contexts/SocketContext';

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const socket = useMemo(() =>
        io("http://localhost:3000", {
            withCredentials: true,
        }), []);

    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        const onConnect = () => {
            console.log("✅ Socket connected to backend:", socket.id);
            setIsConnected(true);
        };

        const onDisconnect = () => {
            console.log("❌ Socket disconnected");
            setIsConnected(false);
        };

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        // Manual check in case it connected before the listeners were attached
        if (socket.connected) onConnect();

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        };
    }, [socket]);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
};