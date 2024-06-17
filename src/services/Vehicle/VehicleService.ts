import DeleteVehicle from "../../Dto/Vehicle/DeleteVehicleDto";
import UpdateVehicle from "../../Dto/Vehicle/UpdateVehicleDto";
import Vehicle from "../../Dto/Vehicle/VehicleDto";
import getOneVehicle from "../../Dto/Vehicle/getOneVehicleDto";
import VehicleRepository from "../../repositories/Vehicle/VehicleRepository";

class VehicleService {
    static async add(vehicle: Vehicle){
        return VehicleRepository.add(vehicle);
    }

    static async getAll(clientID: number){
        return VehicleRepository.getAllVehiclesClient(clientID);
    }

    static async getOne(OneVehicle: getOneVehicle){
        return VehicleRepository.getVehicleById(OneVehicle);
    }

    static async update(vehicle: UpdateVehicle){
        return VehicleRepository.update(vehicle);
    }

    static async delete (deleteVehicle: DeleteVehicle){
        return VehicleRepository.delete(deleteVehicle);
    }
}

export default VehicleService;
