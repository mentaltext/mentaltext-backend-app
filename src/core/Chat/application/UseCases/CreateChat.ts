import { operatorEnum } from "@/shared/Types/IFilter";
import { TCreateChatUseCase } from "../../domain/IChatApplicationUserCases";
import { StatusCodes } from "http-status-codes";
// import { IChatBase } from "../../domain/IChat";
import { Nullable } from "@/shared/Types/TNullable";
import { IUserBase } from "@/core/User/domain/IUser";

export const CreateChat: TCreateChatUseCase =
  (ResponseLogger, _, FindUserImp) => async (req) => {
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
        throw new Error(`User with phone number ${chatParticipantTwo} not found`);
      }

      // const chat: IChatBase = await CreateChatImp({
      //   lastConnectionId: ""
      // });

      return ResponseLogger(StatusCodes.OK, "Phone validated", {
        temporaryCode: "",
      });
    } catch (error) {
      if (error instanceof Error) {
        return ResponseLogger(StatusCodes.BAD_REQUEST, error.message, null);
      }
    }
  };
