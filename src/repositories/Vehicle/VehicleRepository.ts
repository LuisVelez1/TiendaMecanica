import DeleteVehicle from "../../Dto/DeleteVehicleDto";
import UpdateVehicle from "../../Dto/UpdateVehicleDto";
import Vehicle from "../../Dto/VehicleDto";
import getOneVehicle from "../../Dto/getOneVehicleDto";
import db from "../../config/config-db";

class VehicleRepository{

    //Registro de vehiculo
    static async add(vehicle: Vehicle ){
        const sql = 'INSERT INTO vehicles (clienteid, marca, modelo, placa, kilometraje) VALUES (?,?,?,?,?)'
        const values = [ 
            vehicle.clienteid, 
            vehicle.marca, 
            vehicle.modelo, 
            vehicle.placa, 
            vehicle.kilometraje,
        ];
        return db.execute(sql, values);
    }

    // Obtener todos los vehículos de un cliente
    static async getAllVehiclesClient(clienteid: number) {
        const sql = 'SELECT * FROM vehicles WHERE clienteid = ?';
        const values = [clienteid];
        const [rows] = await db.execute(sql, values);
        return rows;
    }

    //Informacion sobre el vehiculo
    static async getVehicleById(vehicle: getOneVehicle){
        const sql = 'SELECT * FROM vehicles WHERE idVehicles = ? AND clienteid = ?';
        const values = [vehicle.idVehicle, vehicle.idCliente];
        const result: any = db.execute(sql, values);
        if(result.length === 0){
            throw new Error('Vehiculo no encontrado');
        }
        return result;
    }

    // Actualizar un vehículo
    static async update(vehicle: UpdateVehicle) {
        const fieldsToUpdate = [];
        const values = [];

        if (vehicle.marca !== undefined) {
            fieldsToUpdate.push("marca = ?");
            values.push(vehicle.marca);
        }
        if (vehicle.modelo !== undefined) {
            fieldsToUpdate.push("modelo = ?");
            values.push(vehicle.modelo);
        }
        if (vehicle.placa !== undefined) {
            fieldsToUpdate.push("placa = ?");
            values.push(vehicle.placa);
        }
        if (vehicle.kilometraje !== undefined) {
            fieldsToUpdate.push("kilometraje = ?");
            values.push(vehicle.kilometraje);
        }

        if (fieldsToUpdate.length === 0) {
            throw new Error("No fields to update");
        }

        values.push(vehicle.idVehicle);
        values.push(vehicle.clienteid);

        const sql = `UPDATE vehicles SET ${fieldsToUpdate.join(", ")} WHERE idVehicles = ? AND clienteid = ?`;
        return db.execute(sql, values);
    }

     // Eliminar un vehículo
     static async delete(deleteVehicle: DeleteVehicle) {
        const sql = 'DELETE FROM vehicles WHERE idVehicles = ? AND clienteid = ?';
        const values = [deleteVehicle.idVehicle, deleteVehicle.clienteId];
        return db.execute(sql, values);
    }
}

export default VehicleRepository;