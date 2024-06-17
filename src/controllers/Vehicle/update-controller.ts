import { Request, Response } from "express";
import VehicleService from "../../services/Vehicle/VehicleService";
import UpdateVehicle from "../../Dto/Vehicle/UpdateVehicleDto";

let update = async (req: Request, res: Response) => {
    try {
        const idVehicle = parseInt(req.params.idVehicle);

        // Validación de idVehicle
        if (isNaN(idVehicle)) {
            return res.status(400).json({ error: "Invalid vehicle ID" });
        }

        const {
            marca,
            modelo,
            placa,
            kilometraje,
        } = req.body;

        const clienteid = req.body.id;



        // Validación de clienteid
        if (clienteid === undefined) {
            return res.status(400).json({ error: "Missing clienteid" });
        }

        // Crear el objeto DTO de actualización
        const updateVehicleDTO = new UpdateVehicle(idVehicle, clienteid, marca, modelo, placa, kilometraje);

        // Llamar al servicio para actualizar el vehículo
        const updateVehicle = await VehicleService.update(updateVehicleDTO);

        return res.status(200).json({ status: 'Vehicle updated successfully', data: updateVehicle });
    } catch (error: any) {
        console.error("Error occurred while updating vehicle:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }  
};

export default update;
