import { IUserBase } from "@/core/User/domain/IUser";
import { UserRespositorysContainer } from "./../../../core/User/infraestructure/containers/UserRespositorysContainer";
import { operatorEnum } from "./../../../shared/Types/IFilter";
import { CommonTokenStructure } from "./../../../shared/Types/Jwt";
import { jwtDecode } from "jwt-decode";
import { Server as SocketServer } from "socket.io";
import { consoleLoggerImp } from "./../../../shared/providers/Logger/application/ConsoleLog";
import { LogType } from "./../../../shared/providers/Logger/domain/ILogger";
import { ActionManager } from "./../../../shared/SocketActions/ActionManager";
import { UserAction } from "./../../../core/User/application/SocketActions/UserAction";
import { ChatActions } from "./../../../core/Chat/application/SocketActions/ChatAction";

export const registerUserSocketActions = (io: SocketServer) => {
  const { findUserImp } = UserRespositorysContainer;

  io.on("connection", async (socket) => {
    const actionManager = new ActionManager();
    let UserSegregable: IUserBase | undefined | null;
    const { token } = socket.handshake.query;
    const isTokenValid = async (token) => {
      try {
        const { exp, phoneNumber }: CommonTokenStructure = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        const findedUser = await findUserImp([
          {
            field: "phoneNumber",
            operator: operatorEnum.EQUAL,
            value: phoneNumber,
          },
        ]);
        UserSegregable = findedUser;
        return exp > currentTime && !!findedUser;
      } catch (error) {
        return false;
      }
    };

    const isValid = await isTokenValid(token);
    if (!isValid) {
      socket.emit("auth_error", "Token inválido o expirado");
      socket.disconnect(true);
      return;
    }
    const { phoneNumber: phoneNumberDestructured, name } = UserSegregable!;
    consoleLoggerImp(
      LogType.LOG,
      `[${phoneNumberDestructured}] - [${name}] - has been connected`
    );
    if (UserSegregable) {
      actionManager.addAction(new UserAction(UserSegregable));
      actionManager.addAction(new ChatActions(UserSegregable));
      actionManager.registerActions(socket);
    }
  });
};
