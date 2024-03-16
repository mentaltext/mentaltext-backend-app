import { ResponseProvider } from "@/shared/providers/Response/infraestructure/Response";
import { Request, Response } from "express";
import { ChatRespositorysContainer } from "./ChatRespositorysContainer";
import { CreateChat } from "../../application/UseCases/CreateChat";
import { UserRespositorysContainer } from "@/core/User/infraestructure/containers/UserRespositorysContainer";

const { saveChatImp } = ChatRespositorysContainer;
const { findUserImp } = UserRespositorysContainer;

export const ChatUseCasesContainer = {
  createChatUseCase: (req: Request, res: Response) =>
    CreateChat(
      ResponseProvider(res),
      saveChatImp,
      findUserImp
    )(req),
};
