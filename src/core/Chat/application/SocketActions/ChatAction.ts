import { consoleLoggerImp } from "../../../../shared/providers/Logger/application/ConsoleLog";
import { IAction } from "../../../../shared/SocketActions/IAction";
import { LogType } from "../../../../shared/providers/Logger/domain/ILogger";
import { Socket } from "socket.io";
import { IUserBase } from "./../../../../core/User/domain/IUser";
import { ChatParticipantsRespositorysContainer } from "./../../../../core/ChatParticipants/infrastructure/containers/ChatParticipantsRespositorysContainer";
import { operatorEnum } from "./../../../../shared/Types/IFilter";

export class ChatActions implements IAction {
  constructor(private userBase: IUserBase) {}

  public register(socket: Socket): void {

    socket.on("joinRoom", async (room) => {
      if (!room) {
        return socket.emit("joinRoomCanceled", "Error en la sala");
      }
      const { findChatParticipantsImp } = ChatParticipantsRespositorysContainer;
      const phoneNumber = this.userBase.phoneNumber;
      let roomId;
      const isJoinRoomNotify = room.includes("-notify");
      if (isJoinRoomNotify) {
        roomId = room.split("-notify")[0];
      } else {
        roomId = room;
      }
      const findedChatParticipant = await findChatParticipantsImp([
        {
          field: "userId",
          operator: operatorEnum.EQUAL,
          value: phoneNumber
        },
        {
          field: "chatId",
          operator: operatorEnum.EQUAL,
          value: roomId
        }
      ]);

      if (!findedChatParticipant) {
        return socket.emit("joinRoomCanceled", "No puedes acceder a esta sala");
      }

      consoleLoggerImp(LogType.INFO, `Usuario se unió a la sala ${roomId} ${phoneNumber}  [${room}]`);
      socket.join(roomId);
      return socket.emit("joinRoomAccepted", `Accediste a la sala ${roomId} [${room}]`);
    });
  }
}
