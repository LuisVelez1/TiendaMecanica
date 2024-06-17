class ProductDto{
    nombre: string;
    descripcion: string;
    precio: number;
    constructor(
        nombre: string,
        descripcion: string,
        precio: number,
    ){
        this.nombre= nombre;
        this.descripcion= descripcion;
        this.precio= precio;
    }
}

export default ProductDto;