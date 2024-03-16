import { TCreateChatReqBody } from "./ChatBodyRequest";
import { TResponseLoggerImp } from "@/shared/providers/Response/domain/IResponse";
import {
  SaveChat
} from "./IChatApplicationImplementations";
import { Request, Response } from "express";
import { FindUser } from "@/core/User/domain/IUserApplicationImplementations";

type EndpointHandler<T extends unknown[], ReqBody = unknown> = (
  ResponserProvider: TResponseLoggerImp,
  ...implementations: T
) => (
  req: Request<unknown, unknown, ReqBody>
) => Promise<Response<unknown, Record<string, unknown>> | undefined>;

export type TCreateChatUseCase = EndpointHandler<
  [SaveChat, FindUser],
  TCreateChatReqBody
>;
