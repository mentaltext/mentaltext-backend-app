import { Socket } from "socket.io";

export interface IAction {
  register(socket: Socket): void;
}
