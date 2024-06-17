import getAllByCliente from "../../Dto/Product/GetAllByClient";
import ProductDto from "../../Dto/Product/ProductDto";
import db from "../../config/config-db";

class ProductRepository{
    static async add(product: ProductDto){
        const sql = 'INSERT INTO products (nombre, descripcion, precio) VALUES (?,?,?)';
        const values = [
            product.nombre,
            product.descripcion,
            product.precio
        ];
        return db.execute(sql, values);
    }

    static async registerShopping(getProducts: getAllByCliente){
        console.log(getProducts);
            const rows = await db.execute('INSERT INTO shoppings (clienteId, productId, cantidad, shopping_date) VALUES (?, ?, ?, ?)', [
                getProducts.idClient,
                getProducts.idProduct,
                getProducts.cantidad,
                getProducts.fecha,
            ]);
            return rows
    }

    static async showProducts(idClient: number) {
            const [rows] = await db.execute('SELECT * FROM vista_compras WHERE idCliente = ?', [idClient]);
            return rows;
    }
}

export default ProductRepository;