import { consoleLoggerImp } from "./../../../../shared/providers/Logger/application/ConsoleLog";
import { IAction } from "./../../../../shared/SocketActions/IAction";
import { LogType } from "./../../../../shared/providers/Logger/domain/ILogger";
import { IUserBase } from "../../domain/IUser";
import { Socket } from "socket.io";

export class UserAction implements IAction {
  private userBase: IUserBase;

  constructor(sendMessageUseCase: IUserBase) {
    this.userBase = sendMessageUseCase;
  }

  public register(socket: Socket): void {
    const { phoneNumber: phoneNumberDestructured, name } = this.userBase;
    socket.on("disconnect", async () => {
      consoleLoggerImp(LogType.WARN, `[${phoneNumberDestructured}] - [${name}] - has been disconnected`);
    });
  }
}
