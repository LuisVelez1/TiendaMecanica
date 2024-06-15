import { Request, Response } from "express";
import VehicleService from "../../services/Vehicle/VehicleService";
import getOneVehiclee from "../../Dto/getOneVehicleDto";

let getOneVehicle = async (req: Request, res: Response) => {
    
    try {
        const idCliente = req.body.id;
        const idVehicle = parseInt(req.params.idVehicle, 10);


        if (isNaN(idVehicle)) {
            return res.status(400).json({ error: "Invalid vehicle ID" });
        }

        const OneVehicle = await VehicleService.getOne(new getOneVehiclee(idCliente, idVehicle));
        if(!OneVehicle){
            return res.status(404).json({ error: "Vehiculo no encontrado" });
        }

        return res.status(200).json(OneVehicle);
    }catch (error: any) {
            console.error("Error occurred while fetching vehicle:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }  
}

export default getOneVehicle;