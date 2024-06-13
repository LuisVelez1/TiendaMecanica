import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

// Middleware de validación para registro de usuario
const registerValidator = [
    check('nombres').notEmpty().withMessage('El campo de nombres es requerido'),
    check('apellidos').notEmpty().withMessage('El campo de apellidos es requerido'),
    check('email').isEmail().withMessage('El email es inválido'),
    check('contrasenia').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
];

// Función middleware para manejar la validación
const handleValidation = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};

export { registerValidator, handleValidation };
