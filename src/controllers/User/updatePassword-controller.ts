// changePassword.ts

import { Request, Response } from "express";
import UserRepository from "../../repositories/User/UserRepository";
import ChangePassword from "../../Dto/changePasswordDto";
import generateHash from "../../helpers/generateHash";

const changePasswordController = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json("Access denied");
    }

    const { id, oldPassword, newPassword } = req.body;

    if (!id || !oldPassword || !newPassword) {
      return res.status(400).json({ error: "Missing id, oldPassword, or newPassword in request body" });
    }

    const userData = new ChangePassword(
      oldPassword,
      newPassword,
      id
    );

    const result = await UserRepository.changePassword(userData);

    return res.status(200).json({
      status: "Password updated successfully",
    });
  } catch (error) {
    console.error("Error occurred while changing password:", error);
    return res.status(500).json({
      status: "Internal Server Error",
    });
  }
};

export default changePasswordController;
