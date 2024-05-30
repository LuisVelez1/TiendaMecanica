import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

// Middleware de validación para autenticación
const authValidator = [
    check('email').isEmail().withMessage('El email es inválido'),
    check('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
];

// Función middleware para manejar la validación
const handleValidation = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};

export { authValidator, handleValidation };
