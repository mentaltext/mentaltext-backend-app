import { query, validationResult } from "express-validator";

export const UserValidateProfileDTO = [
  query("phoneNumber")
    .notEmpty()
    .withMessage("El numero de telefono es requerido."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
