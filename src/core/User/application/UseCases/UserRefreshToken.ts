import { CommonTokenStructure } from "@/shared/Types/Jwt";
import { TUserRefreshTokenUserCase } from "../../domain/IUserApplicationUserCases";
import { StatusCodes } from "http-status-codes";
import { hasExpiredToken } from "@/shared/utils/hasExpiredToken";
import { IUserBase } from "../../domain/IUser";
import { Nullable } from "@/shared/Types/TNullable";
import { operatorEnum } from "@/shared/Types/IFilter";

export const UserRefreshToken: TUserRefreshTokenUserCase =
  (ResponseLogger, DecodeImp, JwtCreateImp, FindUserImp) => async (req) => {
    try {
      const { refreshToken } = req.body;
      const token: CommonTokenStructure = DecodeImp(
        refreshToken
      ) as CommonTokenStructure;

      const hasExpired = hasExpiredToken(token);

      if (hasExpired) {
        ResponseLogger(StatusCodes.UNAUTHORIZED, "Token has expired", null);
      }

      const user: Nullable<IUserBase> = await FindUserImp([
        {
          field: "phoneNumber",
          value: token.phoneNumber,
          operator: operatorEnum.EQUAL,
        },
      ]);

      if (!user) {
        return ResponseLogger(StatusCodes.NOT_FOUND, "User not found", null);
      }

      const expToken = new Date();
      expToken.setHours(expToken.getHours() + 24);
      const { refreshToken: nRefreshToken, token: nToken } = await JwtCreateImp(
        {
          phoneNumber: user.phoneNumber,
          iat: Date.now(),
          exp: expToken.getTime(),
        }
      );

      return ResponseLogger(StatusCodes.OK, "Token refreshed", {
        user: {
          ...user,
          temporaryCode: "",
        },
        refreshToken: nRefreshToken,
        token: nToken,
      });
    } catch (error) {
      if (error instanceof Error) {
        return ResponseLogger(StatusCodes.BAD_REQUEST, error.message, null);
      }
    }
  };
