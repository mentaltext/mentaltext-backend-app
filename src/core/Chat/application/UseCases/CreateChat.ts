import { operatorEnum } from "@/shared/Types/IFilter";
import { TCreateChatUseCase } from "../../domain/IChatApplicationUserCases";
import { StatusCodes } from "http-status-codes";
import { Nullable } from "@/shared/Types/TNullable";
import { IUserBase } from "@/core/User/domain/IUser";
import { IChatBase } from "../../domain/IChat";
import { v4 as uuidv4 } from "uuid";
import { PrismaProvider } from "@/main/providers/PrismaProvider";

export const CreateChat: TCreateChatUseCase =
  (
    ResponseLogger,
    CreateChatImp,
    FindUserImp,
    SaveChatParticipantsImp,
    SaveChatSettingsImp,
    FindChatParticipantsImp
  ) =>
  async (req) => {
    try {
      const { chatParticipant } = req.body;
      const userTwo = req.user;
      const userOne: Nullable<IUserBase> = await FindUserImp([
        {
          field: "phoneNumber",
          value: chatParticipant,
          operator: operatorEnum.EQUAL,
        },
      ]);

      if (!userOne) {
        throw new Error(`User with phone number ${chatParticipant} not found`);
      }

      // Busqueda de chat existente entre los dos usuarios

      const existingChatParticipantOne = await FindChatParticipantsImp([
        {
          field: "userId",
          value: userOne.phoneNumber,
          operator: operatorEnum.EQUAL,
        },
      ]);
      if (existingChatParticipantOne) {
        const chatsForUserOne = await PrismaProvider.chatParticipants.findMany({
          where: { userId: userOne.phoneNumber },
          select: { chatId: true },
        });

        const chatIdsForUserOne = chatsForUserOne.map((cp) => cp.chatId);
        const commonChatWithUserTwo =
          await PrismaProvider.chatParticipants.findFirst({
            where: {
              AND: [
                { chatId: { in: chatIdsForUserOne } },
                { userId: userTwo.phoneNumber },
              ],
            },
          });

        if (commonChatWithUserTwo) {
          return ResponseLogger(StatusCodes.OK, "Chat already exists", {
            chatId: commonChatWithUserTwo.chatId,
          });
        }
      }
      // Fin Busqueda de chat existente entre los dos usuarios
      const chat: IChatBase = await CreateChatImp({
        id: uuidv4(),
        lastConnectionId: "",
        lastMessageSentAt: null
      });

      const chatParticipantOne = await SaveChatParticipantsImp({
        chatId: chat.id,
        userId: userOne.phoneNumber,
      });

      const chatInParticipantTwo = await SaveChatParticipantsImp({
        chatId: chat.id,
        userId: userTwo.phoneNumber,
      });

      const saveChatSettingsImp = await SaveChatSettingsImp({
        chatId: chat.id,
        iaEnabled: false,
        updatedAt: new Date(),
        updatedBy: userOne.phoneNumber,
      });

      const body = {
        chatId: chat.id,
        chatParticipantOne,
        chatInParticipantTwo,
        saveChatSettingsImp,
      };
      console.log(body);
      return ResponseLogger(StatusCodes.CREATED, "Chat created", body);
    } catch (error) {
      if (error instanceof Error) {
        return ResponseLogger(StatusCodes.BAD_REQUEST, error.message, null);
      }
    }
  };
