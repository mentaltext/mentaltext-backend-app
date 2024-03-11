import { body, validationResult } from "express-validator";

export const UserCreateProfileDto = [
  body("phoneNumber").isString().withMessage("Phone number must be a string"),
  body("phoneCode").isString().withMessage("Code must be a string"),
  body("name").isString().withMessage("Code must be a string"),
  body("username").isString().withMessage("Username must be a string"),
  body("language").matches(/^(ES|EN)$/).withMessage("Language must be 'es' or 'en'"),
  body("bio").isString().withMessage("Code must be a string"),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
