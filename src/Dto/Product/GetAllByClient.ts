class getAllByCliente {
    idProduct: number;
    idClient: number;
    cantidad: number;
    fecha: string;
    constructor(
        idProduct: number,
        idClient: number,
        cantidad: number,
        fecha: string,
    )
    {
        this.idProduct = idProduct;
        this.idClient = idClient;
        this.cantidad = cantidad;
        this.fecha = fecha;
    }
}

export default getAllByCliente;