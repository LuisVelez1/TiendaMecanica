import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();


interface JwtPayload {
    data: {id: number},
    exp: number,
    iat: number
}

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  let authorization = req.get('Authorization');    
  if (authorization) {
      const token = authorization.split(' ')[1]; 
             
      if (!token) {
          return res.status(401).json({ status: 'No has enviado un token' });
      }
      try {
          let decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;            
          req.body.id = decoded.data.id;
          return next(); 
      } catch (error) {
          return res.status(403).json({ status: 'No autorizado', error: error });
      }
  } else {
      return res.status(403).json({ status: "Se requiere la cabecera de Autorización" });
  }
}

export default validateToken;