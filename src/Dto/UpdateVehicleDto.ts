class UpdateVehicle {
    idVehicle: number;
    marca?: string;
    modelo?: number;
    placa?: string;
    kilometraje?: number;
    clienteid: number;

    constructor(
        idVehicle: number,
        clienteid: number,
        marca?: string,
        modelo?: number,
        placa?: string,
        kilometraje?: number,
    ) {
        this.idVehicle = idVehicle;
        this.clienteid = clienteid;

        if (marca !== undefined) {
            this.marca = marca;
        }
        if (modelo !== undefined) {
            this.modelo = modelo;
        }
        if (placa !== undefined) {
            this.placa = placa;
        }
        if (kilometraje !== undefined) {
            this.kilometraje = kilometraje;
        }
    }
}

export default UpdateVehicle;
