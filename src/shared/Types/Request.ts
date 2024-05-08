import { Request, Response } from "express";
import { TResponseLoggerImp } from "../providers/Response/domain/IResponse";

export type EndpointHandler<
  T extends unknown[],
  ReqBody = unknown,
  ExtendRequest = unknown,
  ReqQuery = unknown
> = (
  ResponserProvider: TResponseLoggerImp,
  ...implementations: T
) => (
  req: Request<unknown, unknown, ReqBody, ReqQuery> & ExtendRequest
) => Promise<Response<unknown, Record<string, unknown>> | undefined>;
