import { Request, Response } from "express";
import ProductService from "../../services/Product/ProductService";
import getAllByCliente from "../../Dto/Product/GetAllByClient";

let getAllByClient = async (req: Request, res: Response) => {
    try {
       const idProduct = parseInt(req.params.idProduct, 10);
       
       const idCliente = req.body.id;
       const {
          cantidad,
          fecha,
       } = req.body;       

       const productsPurchased = await ProductService.getAllByClient(new getAllByCliente(idProduct, idCliente, cantidad, fecha));

       return res.status(200).json(productsPurchased);
        
    } catch (error: any) {
        if (error && error.code == "ER_DUP_ENTRY") {
          return res.status(500).send({ errorInfo: error.sqlMessage }
          );
        }
      }
}

export default getAllByClient;