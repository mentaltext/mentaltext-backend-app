import { sign } from "jsonwebtoken";
import { TCreateJwtProvider } from "../domain/TJwtProvider";
import { config } from "@/main/providers/LocalsProvider";

export const CreateJwtProvider: TCreateJwtProvider =
  () => (object, options?) => {
    const expToken = new Date();
    expToken.setMonth(expToken.getMonth() + 2);

    const refreshToken = sign(
      {
        ...object,
        exp: expToken.getTime(),
      },
      config().appSecret,
      options
    );
    const token = sign(object, config().appSecret, options);

    return {
      token,
      refreshToken,
    };
  };
