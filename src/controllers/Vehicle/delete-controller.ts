import { Request, Response } from "express"
import VehicleService from "../../services/Vehicle/VehicleService";
import DeleteVehicle from "../../Dto/Vehicle/DeleteVehicleDto";

let deleteVehicle = async (req: Request, res: Response) => {
    try {
        const idVehicle = parseInt(req.params.idVehicle, 10);
        const idClient = req.body.id;

        const deleteVehicle = await VehicleService.delete(new DeleteVehicle(idVehicle, idClient));

        return res.status(203).json({status: 'Vehiculo correctamente eliminado'})
        
    } catch (error: any) {
        console.error("Error occurred while fetching vehicles:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

}

export default deleteVehicle;