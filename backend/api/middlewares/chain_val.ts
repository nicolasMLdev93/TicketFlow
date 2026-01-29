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
      .withMessage("Max length of email field must be 30 chars"),
    body("password")
      .notEmpty()
      .withMessage("The field password is required!")
      .isString()
      .withMessage("Password must be a string")
      .isLength({ max: 20 })
      .withMessage("Max length of password field must be 20 chars"),
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
    body("title")
      .notEmpty()
      .withMessage("Title is required!")
      .isString()
      .withMessage("Title must be a string"),
    body("description")
      .notEmpty()
      .withMessage("Description is required!")
      .isString()
      .withMessage("Description must be a string")
      .isLength({ max: 200 })
      .withMessage("The max length of the description must be 200 char"),
    body("start_date")
      .notEmpty()
      .withMessage("Start_date is required!")
      .isString()
      .withMessage("Start_date must be a string"),
    body("ending_date")
      .notEmpty()
      .withMessage("Ending_date is required!")
      .isString()
      .withMessage("Ending_date must be a string"),
    body("location")
      .notEmpty()
      .withMessage("Location is required!")
      .isString()
      .withMessage("Location must be a string"),
    body("event_producer")
      .notEmpty()
      .withMessage("Event_producer is required!")
      .isString()
      .withMessage("Event_producer must be a string"),
    body("state")
      .notEmpty()
      .withMessage("State is required!")
      .isString()
      .withMessage("State must be a string"),
    body("capacity")
      .notEmpty()
      .withMessage("Capacity is required!")
      .isNumeric()
      .withMessage("Capacity must be an integer"),
  ];
};

export const createFindEventChain = (): ValidationChain[] => {
  return [
    param("title")
      .notEmpty()
      .withMessage("Title is required!")
      .isString()
      .withMessage("Title must be a string"),
  ];
};

export const createTicket_typeChain = (): ValidationChain[] => {
  return [
    body("event_id")
      .notEmpty()
      .withMessage("Event_id is required!")
      .isNumeric()
      .withMessage("Event_id must be an integer"),
    body("name")
      .notEmpty()
      .withMessage("Name is required!")
      .isString()
      .withMessage("Name must be a string")
      .isIn(["vip", "common"])
      .withMessage("Invalid name! Must be: vip or common"),
    body("price")
      .notEmpty()
      .withMessage("Price is required!")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),
    body("description")
      .optional()
      .isString()
      .withMessage("Description must be a string")
      .isLength({ max: 200 })
      .withMessage("Description cannot exceed 200 characters"),
  ];
};

export const createFindTicket_typeChain = (): ValidationChain[] => {
  return [
    param("event_id")
      .notEmpty()
      .withMessage("Event_id is required!")
      .isNumeric()
      .withMessage("Event_id must be an integer"),
  ];
};

export const createOrderChain = (): ValidationChain[] => {
  return [
    body("user_id")
      .notEmpty()
      .withMessage("User_id is required!")
      .isNumeric()
      .withMessage("User_id must be an integer"),
    body("total")
      .notEmpty()
      .withMessage("Total is required!")
      .isFloat({ min: 0 })
      .withMessage("Total must be a positive number"),
    body("vip_count")
      .notEmpty()
      .withMessage("vip_count is required!")
      .isNumeric()
      .withMessage("vip_count must be an integer"),
    body("common_count")
      .notEmpty()
      .withMessage("common_count is required!")
      .isNumeric()
      .withMessage("common_count must be an integer"),
    body("event_id")
      .notEmpty()
      .withMessage("Event_id is required!")
      .isNumeric()
      .withMessage("Event_id must be an integer"),
  ];
};

export const createFindTicketsChain = (): ValidationChain[] => {
  return [
    param("user_id")
      .notEmpty()
      .withMessage("Title is required!")
      .isNumeric()
      .withMessage("Title must be an integer"),
  ];
};