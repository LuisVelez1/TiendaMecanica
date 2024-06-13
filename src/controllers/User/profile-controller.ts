    import UserRepository from '../../repositories/User/UserRepository';
    import { Request, Response } from "express";
    import dotenv from 'dotenv';

    dotenv.config()


    let getOne = async (req: Request, res: Response) => {
    try {
        
        // Accede a la cookie 'token'
     const token = req.cookies.token;
    if (!token) {
     return res.status(401).json("Access denied");
     }

    // Accede al valor 'id' dentro del payload
     const idCli = req.body.id;

        if(!idCli){
            return res.status(401).json('Access Denied');
        }

        const result = await UserRepository.getById(idCli);
        

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