import { Request, Response } from "express";
import VehicleService from "../../services/Vehicle/VehicleService";
import Vehicle from "../../Dto/VehicleDto";

let add = async (req: Request, res: Response) => {
    const token = req.cookies.token;
    try {
        const {
            id,
            marca,
            modelo,
            placa,
            kilometraje
        } = req.body;        

        const vehicle = new Vehicle(id, marca, modelo, placa, kilometraje);
        await VehicleService.add(vehicle);

        return res.status(201).send(
            { status: 'Registro exitoso' }
          );
    } catch (error: any) {
        if (error && error.code == "ER_DUP_ENTRY") {
            return res.status(500).send({ errorInfo: error.sqlMessage }
            );
        }
    }
}

export default add;