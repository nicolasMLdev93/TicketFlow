import { Request, Response, NextFunction } from "express";
const { users, events } = require("../../models");
const { Op } = require("sequelize");

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
    const user_result = await users.findAll({ where: { email: email } });
    if (user_result.length === 0) {
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

export const validate_existanceEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { title, location, start_date } = req.body;
  try {
    const existingEvent = await events.findOne({
      where: {
        title: title,
        location: location,
        start_date: start_date,
      },
    });
    if (existingEvent) {
      res.status(400).json({
        error: `The event "${title}" already exists in ${location} at ${start_date}`,
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

export const validate_existanceEvent_params = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { title } = req.params;
  try {
    const existingEvent = await events.findOne({
      where: {
        title: {
          [Op.like]: `%${title}%`,
        },
      },
    });
    if (!existingEvent) {
      res.status(400).json({
        error: `The aren´t events like "${title}"`,
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

export const validate_existanceTicket_type = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { event_id } = req.body;
  try {
    const existingEvent = await events.findOne({
      where: {
        id:event_id
      },
    });
    if (!existingEvent) {
      res.status(400).json({
        error: `The event with id ${event_id} not  exists!`,
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

export const validate_existanceTicket_type_params = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { event_id } = req.params;
  try {
    const existingEvent = await events.findOne({
      where: {
        id:event_id
      },
    });
    if (!existingEvent) {
      res.status(400).json({
        error: `The event with id ${event_id} not  exists!`,
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

export const validate_existanceUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { user_id } = req.body;
  try {
    const user_result = await users.findOne({
      where: {
        id:user_id
      },
    });
    if (!user_result) {
      res.status(400).json({
        error: `The user with id ${user_id} not  exists!`,
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