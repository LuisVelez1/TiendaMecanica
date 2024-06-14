import { Request, Response } from 'express';
import UserRepository from '../../repositories/User/UserRepository';

const profile = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;

    // Validar si existe el token
    if (!token) {
      return res.status(401).json('Access denied');
    }

    // Obtener el id del cuerpo de la solicitud
    const idCli = req.body.id;

    // Validar si se proporcionó id
    if (!idCli) {
      return res.status(401).json('Access Denied');
    }

    // Buscar el usuario por id
    const user = await UserRepository.getById(idCli);

    // Si se encontró el usuario, devolverlo
    return res.status(200).json(user[0]);

  } catch (error) {
    console.error('Error al buscar usuario:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export default profile;