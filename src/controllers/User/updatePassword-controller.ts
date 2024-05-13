import { Request, Response } from "express";
import UserRepository from "../../repositories/User/UserRepository";
import ChangePassword from "../../Dto/changePasswordDto";
import generateHash from "../../helpers/generateHash";

let changePassword = async (req: Request, res: Response) => {
  try {
    // // Accede a la cookie 'token'
    // const token = req.cookies.token;
    // if (!token) {
    //   return res.status(401).json("Access denied");
    // }
    // // Verifica el token y obtén el payload
    // const payload = jwt.verify(token, process.env.JWT_SECRET || "secret") as JwtPayload;
    // // Accede al valor 'id' dentro del payload
    // const id = payload.data.id;

    const id = req.body.id;

    if(!id){
      return res.status(401).json('Access Denied');
    }

    const userData: any = new ChangePassword(
      req.body.oldPassword,
      req.body.newPassword,
      id
    );
 
    const hashedPassword = await generateHash(userData.newPassword);
    userData.newPassword = hashedPassword;
    await UserRepository.updatePassword(userData);

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

export default changePassword;
