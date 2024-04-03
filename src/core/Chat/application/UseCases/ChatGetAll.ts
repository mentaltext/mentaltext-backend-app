import { PrismaProvider } from "@/main/providers/PrismaProvider";
import { TChatGetAllUserCase } from "../../domain/IChatApplicationUserCases";
import { StatusCodes } from "http-status-codes";

export const ChatGetAll: TChatGetAllUserCase =
  (ResponseLogger) => async (req) => {
    try {
      const { phoneNumber } = req.user;

      const chats = await PrismaProvider.chatParticipants.findMany({
        where: {
          userId: phoneNumber,
        },
        select: {
          chat: {
            select: {
              id: true,
              lastMessageSentAt: true,
              messages: {
                select: {
                  content: true,
                  createdAt: true,
                },
                orderBy: {
                  createdAt: "desc",
                },
                take: 1,
              },
              participants: {
                select: {
                  user: {
                    select: {
                      name: true,
                      phoneNumber: true,
                      profilePhoto: true
                    },
                  },
                },
                where: {
                  user: {
                    NOT: {
                      phoneNumber: phoneNumber
                    }
                  }
                }
              },
            },
          },
        },
        orderBy: {
          chat: {
            lastMessageSentAt: "desc",
          },
        },
      });
      if (!chats) {
        return ResponseLogger(StatusCodes.NOT_FOUND, "Not Chats Found", {});

      }
      return ResponseLogger(StatusCodes.OK, "Chats Encontrados", chats);
    } catch (error) {
      if (error instanceof Error) {
        return ResponseLogger(StatusCodes.BAD_REQUEST, error.message, null);
      }
    }
  };
