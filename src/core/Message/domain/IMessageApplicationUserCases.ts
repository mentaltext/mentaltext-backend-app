import { TMessageGetMessagesReqBody } from "./MessageBodyRequest";
import { TResponseLoggerImp } from "@/shared/providers/Response/domain/IResponse";
import { Request, Response } from "express";
import { TSendMessageReqBody } from "./MessageBodyRequest";
import { IUserBase } from "@/core/User/domain/IUser";

type EndpointHandler<T extends unknown[], ReqBody = unknown, ReqParams = unknown> = (
  ResponserProvider: TResponseLoggerImp,
  ...implementations: T
) => (
  req: Request<ReqParams, unknown, ReqBody, unknown> & { user: IUserBase },
) => Promise<Response<unknown, Record<string, unknown>> | undefined>;

export type TSendMessgeUseCase = EndpointHandler<
  [],
  TSendMessageReqBody
>;
export type TMessageGetMessagesUserCase = EndpointHandler<[], TMessageGetMessagesReqBody, {
  chatId: string;
}>;
