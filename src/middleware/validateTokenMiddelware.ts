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
    try {
        const token = req.cookies.token; // Obtener el token de la cookie llamada 'token'

        if (!token) {
            return res.status(401).json({ status: 'No has enviado un token' });
        }

        let decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        req.body.id = decoded.data.id;
        return next(); // Continuar con el siguiente middleware
    } catch (error: any) {
        return res.status(403).json({ status: 'Token no válido', error: error.message });
    }
}

export default validateToken;
