import getAllByCliente from "../../Dto/Product/GetAllByClient";
import ProductDto from "../../Dto/Product/ProductDto";
import ProductRepository from "../../repositories/Product/ProductRepository";

class ProductService {
    static async add (product: ProductDto){
        return ProductRepository.add(product);
    }
    static async getAllByClient(getAllByCliente: getAllByCliente){
        console.log(getAllByCliente);
        return ProductRepository.registerShopping(getAllByCliente);
    }
    static async showProducts(idClient: number) {
        return ProductRepository.showProducts(idClient);
    }
}

export default ProductService;