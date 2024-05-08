/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponseProvider } from "@/shared/providers/Response/infraestructure/Response";
import { Request, Response } from "express";
import { ChatRespositorysContainer } from "./ChatRespositorysContainer";
import { CreateChat } from "../../application/UseCases/CreateChat";
import { UserRespositorysContainer } from "@/core/User/infraestructure/containers/UserRespositorysContainer";
import { ChatParticipantsRespositorysContainer } from "@/core/ChatParticipants/infrastructure/containers/ChatParticipantsRespositorysContainer";
import { ChatSettingsRespositorysContainer } from "@/core/ChatSettings/infrastructure/containers/ChatSettingsRespositorysContainer";
import { ChatGetAll } from "../../application/UseCases/ChatGetAll";

const { saveChatImp } = ChatRespositorysContainer;
const { findUserImp } = UserRespositorysContainer;
const { saveChatParticipantsImp, findChatParticipantsImp } =
  ChatParticipantsRespositorysContainer;
const { saveChatSettingsImp } = ChatSettingsRespositorysContainer;

export const ChatUseCasesContainer = {
  createChatUseCase: (req: Request, res: Response) =>
    CreateChat(
      ResponseProvider(res),
      saveChatImp,
      findUserImp,
      saveChatParticipantsImp,
      saveChatSettingsImp,
      findChatParticipantsImp
    )(req as any),
  chatGetAllUseCase: (req: Request, res: Response) =>
    ChatGetAll(ResponseProvider(res))(req as any),
};
