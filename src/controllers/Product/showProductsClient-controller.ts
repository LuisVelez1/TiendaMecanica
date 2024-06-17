import { Request, Response } from "express";
import ProductService from "../../services/Product/ProductService";

let showAll = async (req: Request, res: Response) => {
    try {
        const idCli = req.body.id;

        const show = await  ProductService.showProducts(idCli);
        
        

        return res.status(203).json(show);
        
    } catch (error: any) {
        if (error && error.code == "ER_DUP_ENTRY") {
          return res.status(500).send({ errorInfo: error.sqlMessage }
          );
        }
      }
   
}

export default showAll;