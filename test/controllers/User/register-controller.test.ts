import request from 'supertest';
import express, { Request, Response } from 'express';
import register from '../../../src/controllers/User/register-controller';
import UserService from '../../../src/services/User/UserService';
import User from '../../../src/Dto/User/UserDto';

// Crea una instancia de la aplicación de Express
const app = express();
app.use(express.json());
app.post('/register', register);

// Mock del servicio UserService
jest.mock('../../../src/services/User/UserService');

describe('POST /register', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register a user successfully', async () => {
    (UserService.register as jest.Mock).mockResolvedValueOnce(true);

    const response = await request(app)
      .post('/register')
      .send({
        nombres: 'John',
        apellidos: 'Doe',
        email: 'john.doe@example.com',
        contrasenia: 'password123'
      });

    expect(response.status).toBe(201);
    expect(response.body.status).toBe('Registro exitoso :)');
  });

  it('should return an error if email is duplicate', async () => {
    const error = new Error();
    (error as any).code = "ER_DUP_ENTRY";
    (error as any).sqlMessage = "Duplicate entry 'john.doe@example.com' for key 'email'";

    (UserService.register as jest.Mock).mockRejectedValueOnce(error);

    const response = await request(app)
      .post('/register')
      .send({
        nombres: 'John',
        apellidos: 'Doe',
        email: 'john.doe@example.com',
        contrasenia: 'password123'
      });

    expect(response.status).toBe(500);
    expect(response.body.errorInfo).toBe("Duplicate entry 'john.doe@example.com' for key 'email'");
  });
});
