import { Request, Response } from "express";
import ProductService from "../../services/Product/ProductService";
import ProductDto from "../../Dto/Product/ProductDto";

let add = async (req: Request, res: Response) => {
    try {
        const {
            nombre,
            descripcion,
            precio,
        } = req.body;        

        const product = await ProductService.add(new ProductDto(nombre, descripcion, precio));
        console.log(product);
        
        return res.status(200).json({
            status: 'Producto Registrado Exitosamente'
        });
    }catch (error: any) {
        if (error && error.code == "ER_DUP_ENTRY") {
          return res.status(500).send({ errorInfo: error.sqlMessage }
          );
        }
      }
}

export default add;