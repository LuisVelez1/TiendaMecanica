import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const tokenValidation = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json("Access denied");
  }
  const jwtSecret = process.env.JWT_SECRET; // Obtiene el secreto JWT desde la variable de entorno
  if (!jwtSecret) {
    return res.status(500).json("JWT secret not found");
  }

  try {
    const PAYLOAD = jwt.verify(token, jwtSecret) as JwtPayload;
    next();
  } catch (error) {
    return res.status(401).json("Invalid token");
  }
};

export default tokenValidation;
