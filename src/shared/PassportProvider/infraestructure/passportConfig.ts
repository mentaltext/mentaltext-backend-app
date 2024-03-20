import passport from "passport";
import { UserJwt } from "@/core/User/infraestructure/strategys/UserJwt";
import { UnauthorizedError } from "@/shared/CustomErrors/CustomErrors";
import { UserRespositorysContainer } from "@/core/User/infraestructure/containers/UserRespositorysContainer";

passport.use("jwt-user", UserJwt(UserRespositorysContainer.findUserImp));

export const passportUserMiddleware = (req, res, next) => {
  passport.authenticate("jwt-user", { session: false }, (err, user) => {
    if (err) {
      return next(new UnauthorizedError("UnauthorizedError: " + err.message));
    }
    if (!user) {
      return next(new UnauthorizedError("UnauthorizedError: User not found"));
    }
    req.user = user;
    next();
  })(req, res, next);
};

export default passport;
