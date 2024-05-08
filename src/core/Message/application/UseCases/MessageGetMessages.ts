import { TMessageGetMessagesUserCase } from "../../domain/IMessageApplicationUserCases";
import { StatusCodes } from "http-status-codes";
import { PrismaProvider } from "@/main/providers/PrismaProvider";
// import { IMessageBase } from "../../domain/IMessage";

export const MessageGetMessages: TMessageGetMessagesUserCase =
  (ResponseLogger) => async (req) => {
    try {
      const { chatId } = req.params;

      // Obtener los mensajes del chat ordenados cronológicamente
      const messages = await PrismaProvider.message.findMany({
        where: { chatId },
        orderBy: { createdAt: "asc" }, // 'asc' para ascendente, 'desc' para descendente
        include: {
          owner: true, // Incluir detalles del propietario del mensaje si es necesario
        },
      });

      // Opcionalmente, incluir mensajes retenidos si es relevante para tu lógica de negocio
      const retainedMessages = await PrismaProvider.retainedMessages
        .findMany({
          where: { chatId },
          orderBy: { createdAt: "asc" },
          include: {
            owner: true, // Incluir detalles del propietario del mensaje si es necesario
          },
        })
        .then((messages) =>
          messages.map((message) => ({
            ...message,
            type: "QUEUED",
            themes: message.themes || [],
          }))
        );

      // Combinar los mensajes y mensajes retenidos en un solo array
      const combinedMessages = messages.concat(retainedMessages);

      // Ordenar el array combinado por la fecha de creación (createdAt) de forma ascendente
      combinedMessages.sort(
        (a, b) =>
           new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      return ResponseLogger(StatusCodes.OK, "Mensajes obtenidos", {
        messages: combinedMessages,
      });
    } catch (error) {
      if (error instanceof Error) {
        return ResponseLogger(StatusCodes.BAD_REQUEST, error.message, null);
      }
    }
  };
