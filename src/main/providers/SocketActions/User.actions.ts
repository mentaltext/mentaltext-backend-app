import { Server as SocketServer } from "socket.io";

export const registerUserSocketActions = (io: SocketServer) => {
    io.on("connection", (socket) => {
        console.log("a user connected");
        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
        socket.on("subscribe", (msg) => {
            console.log("message: " + msg);
        });
    });
};
