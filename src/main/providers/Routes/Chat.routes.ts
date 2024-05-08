import { CreateChatDto } from "@/core/Chat/infrastructure/DTOs/CreateChatDto";
import { ChatUseCasesContainer } from "@/core/Chat/infrastructure/containers/ChatUseCasesContainer";
import { passportUserMiddleware } from "@/shared/PassportProvider/infraestructure/passportConfig";
import { Request, Response, Router } from "express";

const { createChatUseCase, chatGetAllUseCase } = ChatUseCasesContainer;

export const register = (router: Router) => {
  router.post(
    "/chat/create-chat",
    passportUserMiddleware,
    CreateChatDto,
    (req: Request, res: Response) => createChatUseCase(req, res)
  );
  router.get(
    "/chat/get-all",
    passportUserMiddleware,
    (req: Request, res: Response) => chatGetAllUseCase(req, res)
  );
};
