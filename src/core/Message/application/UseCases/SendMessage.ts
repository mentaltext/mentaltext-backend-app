import { StatusCodes } from "http-status-codes";
import { TSendMessgeUseCase } from "../../domain/IMessageApplicationUserCases";
import { PrismaProvider } from "@/main/providers/PrismaProvider";
import { v4 as uuidv4 } from "uuid";
import { io } from "@/main/providers/SocketServerProvider";

export const SendMessage: TSendMessgeUseCase =
  (ResponseLogger) => async (req) => {
    const { chatId, ownerId, content } = req.body;

    try {
      // Buscar mensajes retenidos para este chat y usuario
      const retainedMessages = await PrismaProvider.retainedMessages.findMany({
        where: {
          chatId,
          ownerId: ownerId,
        },
      });

      if (retainedMessages.length > 0) {
        // Si hay mensajes retenidos, enviarlos al hilo principal
        for (const message of retainedMessages) {
          await PrismaProvider.message.create({
            data: {
              id: uuidv4(),
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
            createdAt: new Date(),
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
            createdAt: new Date(),
          },
        });
      }

      return ResponseLogger(StatusCodes.CREATED, "Chat created", null);
    } catch (error) {
      if (error instanceof Error) {
        return ResponseLogger(StatusCodes.BAD_REQUEST, error.message, null);
      }
    }
  };
