import { StatusCodes } from "http-status-codes";
import { TSendMessgeUseCase } from "../../domain/IMessageApplicationUserCases";
import { PrismaProvider } from "@/main/providers/PrismaProvider";
import { v4 as uuidv4 } from "uuid";
import { io } from "@/main/providers/SocketServerProvider";

export const SendMessage: TSendMessgeUseCase =
  (ResponseLogger) => async (req) => {
    const { chatId, content } = req.body;
    const { phoneNumber } = req.user;
    const ownerId = phoneNumber;

    try {
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

      // validar que la ultima conexcion no tengas mas de 24 horas
      if (lastConnection) {
        const lastConnectionDate = new Date(lastConnection.occurredAt);
        const currentDate = new Date();
        const difference = currentDate.getTime() - lastConnectionDate.getTime();
        const hoursDifference = difference / (1000 * 3600);
        if (!(hoursDifference > 24)) {
          const createdMessage = await PrismaProvider.message.create({
            data: {
              id: uuidv4(),
              chatId,
              ownerId: ownerId,
              content,
              type: "TEXT", // Ajusta según el tipo de mensaje
              createdAt: new Date(),
            },
          });

          await PrismaProvider.chat.update({
            where: { id: chatId },
            data: {
              lastMessageSentAt: createdMessage.createdAt,
            },
          });
          io.to(chatId).emit("new-message", { ownerId, content, createdAt });
          io.to(`${chatId}-notify`).emit("new-message-notify", "Nuevo Mensaje Enviado");
          return ResponseLogger(StatusCodes.CREATED, "Chat created", null);
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
              type: message.type,
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
        io.to(`${chatId}-notify`).emit("new-message-notify", "Nuevo Mensaje Enviado");
      }

      // Verificar si es el primer mensaje del chat
      const totalMessages = await PrismaProvider.message.count({
        where: { chatId },
      });

      if (totalMessages === 0) {
        // Si es el primer mensaje, guardarlo en RetainedMessages
        await PrismaProvider.retainedMessages.create({
          data: {
            id: uuidv4(),
            chatId,
            ownerId: ownerId,
            content,
            type: "TEXT", // Ajusta según el tipo de mensaje
            createdAt,
            status: "SENT",
          },
        });
      } else {
        // Si no, guardarlo en el hilo principal de mensajes
        await PrismaProvider.message.create({
          data: {
            id: uuidv4(),
            chatId,
            ownerId: ownerId,
            content,
            type: "TEXT", // Ajusta según el tipo de mensaje
            createdAt,
          },
        });
        io.to(chatId).emit("new-message", { ownerId, content, createdAt });
        io.to(`${chatId}-notify`).emit("new-message-notify", "Nuevo Mensaje Enviado");
      }

      return ResponseLogger(StatusCodes.CREATED, "Chat created", null);
    } catch (error) {
      if (error instanceof Error) {
        return ResponseLogger(StatusCodes.BAD_REQUEST, error.message, null);
      }
    }
  };
