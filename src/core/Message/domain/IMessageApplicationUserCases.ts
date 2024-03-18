import { TResponseLoggerImp } from "@/shared/providers/Response/domain/IResponse";
import { Request, Response } from "express";
import { TSendMessageReqBody } from "./MessageBodyRequest";

type EndpointHandler<T extends unknown[], ReqBody = unknown> = (
  ResponserProvider: TResponseLoggerImp,
  ...implementations: T
) => (
  req: Request<unknown, unknown, ReqBody>
) => Promise<Response<unknown, Record<string, unknown>> | undefined>;

export type TSendMessgeUseCase = EndpointHandler<
  [],
  TSendMessageReqBody
>;
