import { Server as SocketServer } from "socket.io";
import { registerUserSocketActions } from "./User.actions";
export const SocketActionsProvider = (io: SocketServer) => {
  registerUserSocketActions(io);
};
