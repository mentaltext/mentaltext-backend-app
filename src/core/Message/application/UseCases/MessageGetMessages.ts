import { TMessageGetMessagesUserCase } from "../../domain/IMessageApplicationUserCases";
import { StatusCodes } from "http-status-codes";
import { PrismaProvider } from "@/main/providers/PrismaProvider";

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
      const retainedMessages = await PrismaProvider.retainedMessages.findMany({
        where: { chatId },
        orderBy: { createdAt: "asc" },
        include: {
          owner: true, // Incluir detalles del propietario del mensaje si es necesario
        },
      });
      return ResponseLogger(StatusCodes.OK, "Mensajes obtenidos", {
        messages,
        retainedMessages,
      });
    } catch (error) {
      if (error instanceof Error) {
        return ResponseLogger(StatusCodes.BAD_REQUEST, error.message, null);
      }
    }
  };
