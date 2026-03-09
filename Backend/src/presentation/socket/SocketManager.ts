import { container } from "tsyringe";
import http from "http";
import { SocketServer } from "./SocketServer";

export const initSocket = (server: http.Server) => {
    const socketServer = container.resolve(SocketServer); 
    return socketServer.init(server);
};

export const io = () => container.resolve(SocketServer).getIO();