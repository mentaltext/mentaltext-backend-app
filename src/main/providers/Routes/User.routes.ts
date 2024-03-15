import { NextFunction, Request, Response, Router } from "express";
import { UserCasesContainer } from "@/core/User/infraestructure/containers/UserCasesContainer";
import { UserSendPhoneValidateDto } from "@/core/User/infraestructure/DTOs/UserSendPhoneValidate";
import { UserCodePhoneValidateDto } from "@/core/User/infraestructure/DTOs/UserCodePhoneValidate";
import { UserCreateProfileDto } from "@/core/User/infraestructure/DTOs/UserCreateProfile";
import { UploadFileHandler } from "@/main/providers/MulterProvider";
import { UserRefresTokenDto } from "@/core/User/infraestructure/DTOs/UserRefreshToken";
import { passportUserMiddleware } from "@/shared/PassportProvider/infraestructure/passportConfig";
export const register = (router: Router) => {
  if (process.env.NODE_ENV !== "prod") {
    router.get("/err", function (_, __, ___) {
      throw new Error("keyboard cat!");
    });
    router.get("/syntax-error", function (_, __, ___) {
      throw new SyntaxError("keyboard cat!");
    });
    router.get("/unauthorized-err", function (_, __) {
      class UnauthorizedError extends Error {
        constructor(message?: string) {
          super(message);
          this.name = "UnauthorizedError";
        }
      }

      throw new UnauthorizedError("Test unauthorized error");
    });
    router.get("/test-custom-error", (_, __, ___) => {
      class CustomError extends Error {
        constructor(message?: string) {
          super(message);
          this.name = "CustomError";
        }
      }

      throw new CustomError("Test custom error");
    });
  }
  router.post(
    "/user/send-phone-validate",
    UserSendPhoneValidateDto,
    (req: Request, res: Response) =>
      UserCasesContainer.userSendPhoneValidateUserCase(req, res)
  );
  router.post(
    "/user/code-phone-validate",
    UserCodePhoneValidateDto,
    (req: Request, res: Response) =>
      UserCasesContainer.userCodePhoneValidateUserCase(req, res)
  );
  router.post(
    "/user/refresh-token",
    UserRefresTokenDto,
    (req: Request, res: Response) =>
      UserCasesContainer.userRefreshToken(req, res)
  );
  router.post(
    "/user/create-profile",
    UploadFileHandler,
    UserCreateProfileDto,
    async (req: Request, res: Response, next: NextFunction) => {
      passportUserMiddleware(req, res, next);
      UserCasesContainer.userCreateProfile(req, res);
    }
  );
};
