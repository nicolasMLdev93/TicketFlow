const { validationResult } = require("express-validator");
import { Request, Response, NextFunction } from "express";

export const validate_results = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        errors: errors.array().map((error: any) => ({
          field: error.param,
          message: error.msg,
          value: error.value,
          location: error.location,
        })),
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
