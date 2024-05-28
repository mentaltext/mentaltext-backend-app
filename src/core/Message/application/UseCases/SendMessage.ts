import { StatusCodes } from "http-status-codes";
import { TSendMessgeUseCase } from "../../domain/IMessageApplicationUserCases";
import { PrismaProvider } from "@/main/providers/PrismaProvider";
import { v4 as uuidv4 } from "uuid";
import { io } from "@/main/providers/SocketServerProvider";
import { MessageReadStatus } from "@prisma/client";
import { validatesIfConnectionTimeExpired } from "@/core/AppGlobalConfigs/application/UseCases/validatesIfConnectionTimeExpired";

export const SendMessage: TSendMessgeUseCase =
  (ResponseLogger) => async (req) => {
    const { chatId, content } = req.body;
    const { phoneNumber } = req.user;
    const ownerId = phoneNumber;
    try {
      let sendeMessageToData;
      const chatParticipant = await PrismaProvider.chatParticipants.findFirst({
        where: {
          chatId,
          userId: ownerId,
        },
      });
      // Hay que validar que el usuario si pertenezca a ese chat
      if (!chatParticipant) {
        return ResponseLogger(
          StatusCodes.UNAUTHORIZED,
          "You Cant Message in this chat",
          null
        );
      }
      // Verificar si el chat existe
      const chat = await PrismaProvider.chat.findUnique({
        where: { id: chatId },
      });
      const createdAt = new Date();

      if (!chat) {
        return ResponseLogger(StatusCodes.NOT_FOUND, "Chat not found", null);
      }

      // obtner el lastConnectionId
      const lastConnection = await PrismaProvider.connections.findFirst({
        where: { chatId },
        orderBy: { occurredAt: "desc" },
      });
      const canCreateChatConnection = await validatesIfConnectionTimeExpired(
        lastConnection ??
          ({
            occurredAt: "2020-01-01 23:00:00.679",
            chatId: "",
            id: "",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any)
      );
      // validar que la ultima conexcion no tengas mas de 24 horas
      if (lastConnection) {
        if (canCreateChatConnection) {
          const createdMessage = await PrismaProvider.message.create({
            data: {
              id: uuidv4(),
              chatId,
              ownerId: ownerId,
              content,
              type: "DELIVERED",
              createdAt: new Date(),
            },
          });

          await PrismaProvider.chat.update({
            where: { id: chatId },
            data: {
              lastMessageSentAt: createdMessage.createdAt,
            },
          });
          io.to(chatId).emit("new-message", {
            chatId,
            ownerId,
            content,
            createdAt,
            id: createdMessage.id,
          });
          io.to(`${chatId}-notify`).emit(
            "new-message-notify",
            "Nuevo Mensaje Enviado"
          );
          return ResponseLogger(
            StatusCodes.CREATED,
            "Message Sended",
            createdMessage
          );
        }
      }

      // Buscar mensajes retenidos para este chat y usuario
      const retainedMessages = await PrismaProvider.retainedMessages.findMany({
        where: {
          chatId,
        },
      });

      if (
        retainedMessages.length > 0 &&
        retainedMessages[0].ownerId !== ownerId
      ) {
        // Si hay mensajes retenidos, enviarlos al hilo principal
        for (const message of retainedMessages) {
          await PrismaProvider.message.create({
            data: {
              id: message.id,
              chatId: message.chatId,
              ownerId: message.ownerId,
              content: message.content,
              type: "DELIVERED" as MessageReadStatus,
              createdAt: message.createdAt,
            },
          });
          // Eliminar el mensaje retenido
          await PrismaProvider.retainedMessages.delete({
            where: { id: message.id },
          });
        }

        // Registrar una nueva conexión
        const conecction = await PrismaProvider.connections.create({
          data: {
            chatId,
            occurredAt: new Date(),
          },
        });

        // Editar el chat en lastConnectionId
        await PrismaProvider.chat.update({
          where: { id: chatId },
          data: {
            lastConnectionId: conecction.id,
          },
        });

        // Notificar a los usuarios del chat sobre los mensajes retenidos enviados
        io.to(chatId).emit(
          "retained-messages-sent",
          retainedMessages.map((m) => m.content)
        );
        io.emit("chats-actualized");
      }

      const totalMessages = await PrismaProvider.message.count({
        where: { chatId },
      });

      if (
        (totalMessages === 0 || !canCreateChatConnection) &&
        (retainedMessages[0]?.ownerId === ownerId || retainedMessages.length < 1 )
      ) {
        console.log("mando un mensaje queued 1");
        //Si es el primer mensaje, guardarlo en RetainedMessages
        sendeMessageToData = await PrismaProvider.retainedMessages.create({
          data: {
            id: uuidv4(),
            chatId,
            ownerId: ownerId,
            content,
            type: "QUEUED",
            createdAt,
            status: "SENT",
          },
        });
      } else if ((totalMessages === 0 || !canCreateChatConnection) && retainedMessages[0]?.ownerId === ownerId) {
        console.log("mando un mensaje queued 2");
        //Si es el primer mensaje, guardarlo en RetainedMessages
        sendeMessageToData = await PrismaProvider.retainedMessages.create({
          data: {
            id: uuidv4(),
            chatId,
            ownerId: ownerId,
            content,
            type: "QUEUED",
            createdAt,
            status: "SENT",
          },
        });
      } else {
        console.log("mando un mensaje DELIVERED");
        sendeMessageToData = await PrismaProvider.message.create({
          data: {
            id: uuidv4(),
            chatId,
            ownerId: ownerId,
            content,
            type: "DELIVERED", // Ajusta según el tipo de mensaje
            createdAt,
          },
        });
        io.to(chatId).emit("new-message", {
          chatId,
          ownerId,
          content,
          createdAt,
          id: sendeMessageToData.id,
        });
      }

      return ResponseLogger(
        StatusCodes.CREATED,
        "Message Sended",
        sendeMessageToData
      );
    } catch (error) {
      if (error instanceof Error) {
        return ResponseLogger(StatusCodes.BAD_REQUEST, error.message, null);
      }
    }
  };
