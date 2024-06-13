import { Request, Response } from "express";
import UserService from '../../services/User/UserService';
import User from "../../Dto/UserDto";


let register = async (req: Request, res: Response) => {
  try {
    const {
      nombres,
      apellidos,
      email,
      contrasenia,
    } = req.body;
    const registerUser = await UserService.register(new User( nombres, apellidos, email, contrasenia ));
    return res.status(201).send(
      { status: 'Registro exitoso :)' }
    );
  } catch (error: any) {
    if (error && error.code == "ER_DUP_ENTRY") {
      return res.status(500).send({ errorInfo: error.sqlMessage }
      );
    }
  }
}


export default register;