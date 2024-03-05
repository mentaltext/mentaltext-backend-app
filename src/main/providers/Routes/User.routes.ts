import { Request, Response, Router } from "express";
import { UserCasesContainer } from "@/core/User/infraestructure/containers/UserCasesContainer";
import { UserSendPhoneValidateDto } from "@/core/User/infraestructure/DTOs/UserSendPhoneValidate";

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
  router.get("/user/send-phone-validate", UserSendPhoneValidateDto, (req: Request, res: Response) => UserCasesContainer.userSendPhoneValidateUserCase(req, res));
};
