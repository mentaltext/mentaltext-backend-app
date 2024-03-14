import { Application } from "express";
import { Server as SocketServer } from "socket.io";

export let io: SocketServer;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SocketServerProvider = (server: any) => (): Application => {
  io = new SocketServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  return server;
};
