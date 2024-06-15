import { Request, Response } from "express";
import VehicleService from "../../services/Vehicle/VehicleService";

let getAllVehiclesClient = async (req: Request, res: Response) => {
    try {
        const idClient = req.body.id;

        if (!idClient) {
            return res.status(400).json({ error: "Missing clienteid in request body" });
        }

        const getAll = await VehicleService.getAll(idClient);
        
        return res.status(200).json(getAll);
    } catch (error: any) {
        console.error("Error occurred while fetching vehicles:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export default getAllVehiclesClient;
