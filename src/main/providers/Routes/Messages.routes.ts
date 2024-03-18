import { CreateChatDto } from "@/core/Chat/infrastructure/DTOs/CreateChatDto";
import { messageUseCasesContainer } from "@/core/Message/infrastructure/containers/MessageUseCasesContainer";
import { Request, Response, Router } from "express";

const { sendMessageUseCase } = messageUseCasesContainer;

export const register = (router: Router) => {
  router.post("/message/send", CreateChatDto, (req: Request, res: Response) =>
    sendMessageUseCase(req, res)
  );
};
