import { body, param, query, ValidationChain } from "express-validator";

export const createRegisterChain = (): ValidationChain[] => {
  return [
    body("email")
      .isEmail()
      .withMessage("The field email must have email format!")
      .notEmpty()
      .withMessage("The field email is required!")
      .isString()
      .withMessage("Email must be a string")
      .isLength({ max: 30 })
      .withMessage(
        "Max length of email field must be 30 chars",
      ),
    body("password")
      .notEmpty()
      .withMessage("The field password is required!")
      .isString()
      .withMessage("Password must be a string")
      .isLength({ max: 20 })
      .withMessage(
        "Max length of password field must be 20 chars",
      ),
    body("passwordConfirmation").custom((value, { req }) => {
      if (value != req.body.password) {
        throw new Error("Passwords do not match!");
      } else {
        return true;
      }
    }),
    body("name")
      .notEmpty()
      .withMessage("Name is required!")
      .isString()
      .withMessage("Name must be a string")
      .isLength({ max: 30 })
      .withMessage("The max length of your name must be 30 char"),
    body("surname")
      .notEmpty()
      .withMessage("Surname is required!")
      .isString()
      .withMessage("Surname must be a string")
      .isLength({ max: 20 })
      .withMessage("The max length of your Surname must be 20 char"),
    body("role")
      .optional()
      .isString()
      .withMessage("Role must be a string!")
      .isIn(["admin", "user"])
      .withMessage("Invalid role! Must be: admin or user")
      .default("user"),
  ];
};

export const createLoginChain = (): ValidationChain[] => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Email is required!")
      .isString()
      .withMessage("Email must be a string")
      .isLength({ max: 40 })
      .withMessage("The max length of your email must be 40 char"),
    body("password")
      .notEmpty()
      .withMessage("Password is required!")
      .isString()
      .withMessage("Password must be a string")
      .isLength({ max: 20 })
      .withMessage("The max length of your password must be 20 char"),
  ];
};

export const createEventChain = (): ValidationChain[] => {
  return [
    body('title'),
    body('description'),
    body('start_date'),
    body('ending_date'),
    body('location'),
    body('event_producer'),
    body('state'),
    body('capacity'),
  ]
}
