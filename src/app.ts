import express from "express";
import bodyParser from 'body-parser';

//Rutas
import register from './routes/User/register';
import auth from './routes/auth';
import deleteUser from './routes/User/deleteU';
import profile from './routes/User/profile';
import changePassword from './routes/User/changePassword';
import registerVehicle from './routes/Vehicle/add';
import getVehicles from './routes/Vehicle/getAllVehiclesClient';
import getOneVehicle from './routes/Vehicle/getOneVehicle';
import updateVehicle from './routes/Vehicle/updateVehicle';
import deleteVehicle from './routes/Vehicle/delete';
import registerProduct from './routes/Product/add';
import shoppingProducts from './routes/Product/registerProductsClient';
import showAllProducts from './routes/Product/showAll';


import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();


const app = express().use(bodyParser.json());

app.use(cookieParser());


//Usuario
app.use('/register', register);
app.use('/auth', auth);
app.use('/profile', profile);
app.use('/profile/changePassword', changePassword);
app.use('/delete', deleteUser);

// Vehículo
app.use('/registerVehicle', registerVehicle);
app.use('/Vehicles', getVehicles);
app.use('/Vehicle', getOneVehicle);
app.use('/updateVehicle', updateVehicle);
app.use('/deleteVehicle', deleteVehicle);

//Product
app.use('/registerProduct', registerProduct);''
app.use('/shoppingProducts', shoppingProducts);
app.use('/showProducts', showAllProducts);



const PORT = process.env.PORT || 10304;

app.listen(PORT, () => {
  console.log("Servidor ejecutándose en el puerto: ", PORT);
}).on("error", (error) => {
  throw new Error(error.message);
});


