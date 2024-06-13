import { Request, Response } from "express";
import UserRepository from '../../repositories/User/UserRepository';

const deleteU = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json("Access denied");
        }

        const idC = req.body.id;
        if (!idC) {
            return res.status(400).json({ error: "Missing id in request body" });
        }

        const result = await UserRepository.delete(idC);
        if (result) {
            return res.status(200).json({
                status: 'Eliminación exitosa'
            });
        } else {
            return res.status(404).json({
                error: 'Usuario no encontrado'
            });
        }
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        return res.status(500).json({
            error: 'Internal server error'
        });
    }
};

export default deleteU;
