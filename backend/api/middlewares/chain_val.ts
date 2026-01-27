import { body, param, query, ValidationChain } from "express-validator";

export const createRegisterChain = (): ValidationChain =>
  body("email")
    .isEmail()
    .withMessage("The field email must have email format!")
    .notEmpty()
    .withMessage("The field email is required!")
    .isLength({ max: 30 })
    .withMessage(
      "Max length of email field must be lower or equal that 30 chars",
    );
