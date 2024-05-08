import { DecodeOptions, JwtPayload, SignOptions } from "jsonwebtoken";

export type TCreateJwtProviderImp = <T = null>(object: Record<keyof T, unknown>, options?: SignOptions) => { token: string; refreshToken: string };
export type TCreateJwtProvider = () => TCreateJwtProviderImp;

export type DecodeInterface = (token: string, options?: DecodeOptions) => null | JwtPayload | string;
