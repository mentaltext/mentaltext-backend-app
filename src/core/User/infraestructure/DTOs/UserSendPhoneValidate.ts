import { body, validationResult } from "express-validator";

export const UserSendPhoneValidateDto = [
  body("phoneNumber").isString().withMessage("Phone number must be a string"),
  body("phoneCode").isString().withMessage("Code must be a string"),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
