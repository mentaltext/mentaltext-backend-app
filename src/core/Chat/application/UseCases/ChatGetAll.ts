import { PrismaProvider } from "@/main/providers/PrismaProvider";
import { TChatGetAllUserCase } from "../../domain/IChatApplicationUserCases";
import { StatusCodes } from "http-status-codes";

export const ChatGetAll: TChatGetAllUserCase =
  (ResponseLogger) => async (req) => {
    try {
      const { phoneNumber } = req.user;
      console.log(phoneNumber);
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
                  ownerId: true,
                  content: true,
                  createdAt: true,
                  type: true,
                  id: true,
                },
                orderBy: {
                  createdAt: "desc",
                },
                where: {
                  NOT: {
                    ownerId: phoneNumber
                  },
                  AND: {
                    type: "DELIVERED"
                  }
                }
              },
              retainedMessages: {
                select: {
                  ownerId: true,
                  content: true,
                  createdAt: true,
                  type: true,
                  id: true,
                },
                orderBy: {
                  createdAt: "desc",
                },
                where: {
                  AND: {
                    type: "QUEUED"
                  }
                }
              },
              participants: {
                select: {
                  user: {
                    select: {
                      name: true,
                      phoneNumber: true,
                      profilePhoto: true,
                    },
                  },
                },
                where: {
                  user: {
                    NOT: {
                      phoneNumber: phoneNumber,
                    },
                  },
                },
              },
              connections: {
                select: {
                  id: true,
                  occurredAt: true,
                }
              }
            },
          },
        },

        orderBy: {
          chat: {
            lastMessageSentAt: "asc",
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
