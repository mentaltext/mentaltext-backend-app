import { body, validationResult } from "express-validator";

export const CreateChatDto = [
  body("chatParticipant").isString().withMessage("Phone number must be a string"),
  body("chatParticipantTwo").isString().withMessage("Phone number must be a string"),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
