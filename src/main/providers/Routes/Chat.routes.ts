import { CreateChatDto } from "@/core/Chat/infrastructure/DTOs/CreateChatDto";
import { ChatUseCasesContainer } from "@/core/Chat/infrastructure/containers/ChatUseCasesContainer";
import { passportUserMiddleware } from "@/shared/PassportProvider/infraestructure/passportConfig";
import { Request, Response, Router } from "express";

const { createChatUseCase } = ChatUseCasesContainer;

export const register = (router: Router) => {
  router.post(
    "/chat/create-chat",
    passportUserMiddleware,
    CreateChatDto,
    (req: Request, res: Response) => createChatUseCase(req, res)
  );
};
