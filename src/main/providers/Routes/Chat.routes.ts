import { CreateChatDto } from "@/core/Chat/infrastructure/DTOs/CreateChatDto";
import { ChatUseCasesContainer } from "@/core/Chat/infrastructure/containers/ChatUseCasesContainer";
import { Request, Response, Router } from "express";

const { createChatUseCase } = ChatUseCasesContainer;

export const register = (router: Router) => {
  router.post(
    "/chat/create-chat",
    CreateChatDto,
    (req: Request, res: Response) => createChatUseCase(req, res)
  );
};
