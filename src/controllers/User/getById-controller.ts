import UserRepository from '../../repositories/User/UserRepository';
import { Request, Response } from "express";
import dotenv from 'dotenv';
import jwt, { JwtPayload } from 'jsonwebtoken';

dotenv.config()


let getOne = async (req: Request, res: Response) => {
  try {
   const token = req.cookies.token
    if(!token){
        return res.status(401).json('Access Denied');
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET || "secret") as JwtPayload;
    const id = payload.data.id;

    const result = await UserRepository.getById(id);
if(result) {                                                
        return res.status(200).json(result[0]);
    } else {
        return res.status(404).json({
            error: 'Usuario no encontrado'
        });
    }
    } catch (error) {
        console.log('error al encontrar el usuario', error);
    }
}

export default getOne;