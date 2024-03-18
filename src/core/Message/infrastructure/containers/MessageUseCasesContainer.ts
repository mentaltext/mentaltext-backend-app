import { ResponseProvider } from "@/shared/providers/Response/infraestructure/Response";
import { Request, Response } from "express";
import { SendMessage } from "../../application/UseCases/SendMessage";

export const messageUseCasesContainer = {
  sendMessageUseCase: (req: Request, res: Response) =>
    SendMessage(ResponseProvider(res))(req),
};
