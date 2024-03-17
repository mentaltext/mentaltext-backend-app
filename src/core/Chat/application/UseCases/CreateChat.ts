import { operatorEnum } from "@/shared/Types/IFilter";
import { TCreateChatUseCase } from "../../domain/IChatApplicationUserCases";
import { StatusCodes } from "http-status-codes";
import { Nullable } from "@/shared/Types/TNullable";
import { IUserBase } from "@/core/User/domain/IUser";
import { IChatBase } from "../../domain/IChat";
import { v4 as uuidv4 } from "uuid";

const myuuid = uuidv4();

export const CreateChat: TCreateChatUseCase =
  (ResponseLogger, CreateChatImp, FindUserImp, SaveChatParticipantsImp, SaveChatSettingsImp) => async (req) => {
    try {
      const { chatParticipant, chatParticipantTwo } = req.body;
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

      const userTwo: Nullable<IUserBase> = await FindUserImp([
        {
          field: "phoneNumber",
          value: chatParticipantTwo,
          operator: operatorEnum.EQUAL,
        },
      ]);
      if (!userTwo) {
        throw new Error(
          `User with phone number ${chatParticipantTwo} not found`
        );
      }
      const generatedUid = myuuid;
      const chat: IChatBase = await CreateChatImp({
        id: generatedUid,
        lastConnectionId: "",
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

      return ResponseLogger(StatusCodes.CREATED, "Chat created", body);
    } catch (error) {
      if (error instanceof Error) {
        return ResponseLogger(StatusCodes.BAD_REQUEST, error.message, null);
      }
    }
  };
