import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";
import { config } from "@/main/providers/LocalsProvider";
import { FindUser } from "../../domain/IUserApplicationImplementations";
import { operatorEnum } from "@/shared/Types/IFilter";

dotenv.config();

const userOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config().appSecret,
};
export const UserJwt = (UserFind: FindUser) => new JwtStrategy(userOptions, async function(jwtPayload, done) {
  try {
    const user = await UserFind([
      {
        field: "phoneNumber",
        value: jwtPayload.phoneNumber,
        operator: operatorEnum.EQUAL
      }
    ]);
    if (jwtPayload.phoneNumber !== user?.phoneNumber) {
      return done(null, false);
    }
    if (user) {
      return done(null, {
        ...user,
        temporaryCode: ""
      });
    }
    return done(null, false);
  } catch (error) {
    return done(null, false);
  }
});
