import request from 'supertest';
import express, { Request, Response } from 'express';
import profile from '../../../src/controllers/User/profile-controller';
import UserRepository from '../../../src/repositories/User/UserRepository';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

// Configuración de la aplicación de Express
const app = express();
app.use(express.json());
app.use(cookieParser());
app.get('/profile', profile);

// Mock del UserRepository
jest.mock('../../../src/repositories/User/UserRepository');

describe('GET /profile', () => {
  const secret = 'ne12ig6fqabdvqye??#3#4gfWEFNWU2e2vJNWd';
  let token: string;

  beforeEach(() => {
    jest.clearAllMocks();
    token = jwt.sign({ id: 2 }, secret, { expiresIn: '1h' }); // Genera un token de prueba
  });

  it('should return user data when valid token and id are provided', async () => {
    const userMock = [{ idCliente: 2, nombres: 'Luis', apellidos: 'Velez', email: 'luisvelez@gmail.com' }];
    (UserRepository.getById as jest.Mock).mockResolvedValueOnce(userMock);

    const response = await request(app)
      .get('/profile')
      .set('Cookie', [`token=${token}`])
      .send({ id: 2 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(userMock[0]);
  });

  it('should return 401 if no token is provided', async () => {
    const response = await request(app)
      .get('/profile')
      .send();

    expect(response.status).toBe(401);
    expect(response.text).toContain('Access denied');
  });

  it('should return 401 if id is not provided', async () => {
    const response = await request(app)
      .get('/profile')
      .set('Cookie', [`token=${token}`])
      .send();

    expect(response.status).toBe(401);
    expect(response.text).toContain('Access Denied');
  });  
});