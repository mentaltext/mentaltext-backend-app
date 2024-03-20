import { SendMessageDto } from "@/core/Message/infrastructure/DTOs/SendMessageDto";
import { messageUseCasesContainer } from "@/core/Message/infrastructure/containers/MessageUseCasesContainer";
import { passportUserMiddleware } from "@/shared/PassportProvider/infraestructure/passportConfig";
import { Request, Response, Router } from "express";

const { sendMessageUseCase, getMessagesUseCase } = messageUseCasesContainer;

export const register = (router: Router) => {
  router.post(
    "/message/send",
    passportUserMiddleware,
    SendMessageDto,
    (req: Request, res: Response) => {
      sendMessageUseCase(req, res);
    }
  );
  router.get("/message/get/:chatId", (req: Request, res: Response) =>
    getMessagesUseCase(req, res)
  );
};
