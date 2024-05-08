/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponseProvider } from "@/shared/providers/Response/infraestructure/Response";
import { Request, Response } from "express";
import { SendMessage } from "../../application/UseCases/SendMessage";
import { MessageGetMessages } from "../../application/UseCases/MessageGetMessages";

export const messageUseCasesContainer = {
  sendMessageUseCase: (req: Request, res: Response) =>
    SendMessage(ResponseProvider(res))(req as any),
  getMessagesUseCase: (req: Request, res: Response) =>
    MessageGetMessages(ResponseProvider(res))(req as any),
};
