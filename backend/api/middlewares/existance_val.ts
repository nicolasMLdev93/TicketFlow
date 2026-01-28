import { Request, Response, NextFunction } from "express";
const { users } = require("../../models");

export const validate_existanceUser_register = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { email } = req.body;
  try {
    const user_result = await users.findOne({ where: { email: email } });
    if (user_result) {
      res.status(400).json({
        error: `The user with the email ${email} already exists!`,
        success: false,
      });
      return;
    } else {
      next();
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", success: false, error: error });
  }
};

export const validate_existanceUser_login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { email } = req.body;
  try {
    const user_result = await users.findOne({ where: { email: email } });
    if (!user_result) {
      res.status(404).json({
        error: `User with the email ${email} not exists!`,
        success: false,
      });
      return;
    } else {
      next();
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", success: false, error: error });
  }
};
