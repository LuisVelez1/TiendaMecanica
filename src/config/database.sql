CREATE database Proyecto;

USE Proyecto;

-- TABLA DE CLIENTES (USUARIOS DE LA APLICACION) --
CREATE TABLE clients (
  idCliente INT PRIMARY KEY AUTO_INCREMENT,
  nombres VARCHAR(100) NOT NULL,
  apellidos VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  contrasenia VARCHAR(100) NOT NULL
);

-- TABLA DE VEHICULOS (RELACIONADOS CON EL CLIENTE) --
CREATE TABLE vehicles(
	idVehicles INT PRIMARY KEY AUTO_INCREMENT,
    clienteid INT,
    marca VARCHAR(100),
    modelo INT,
    placa VARCHAR(20),
    kilometraje INT,
    FOREIGN KEY (clienteid) REFERENCES clients(idCliente)
);

-- TABLA DE PRODUCTOS (REPUESTOS, ACCESORIOS, HERRAMIENTAS, ETC.)

CREATE TABLE products(
	idProducto INT PRIMARY KEY AUTO_INCREMENT,
	nombre VARCHAR(100) NOT NULL,
	descripcion VARCHAR(100) NOT NULL,
	precio FLOAT
);

-- Tabla compras que se encarga de la gestion de las ventas realizadas al cliente, se relaciona los productos y el cliente --

CREATE TABLE shoppings(
	idShopping INT PRIMARY KEY AUTO_INCREMENT,
	clienteId INT,
	productId INT,
	cantidad INT,
	shopping_date DATETIME,
	FOREIGN KEY (clienteId) REFERENCES clients (idCliente),
	FOREIGN KEY (productId) REFERENCES products (idProducto)
);

-- INVENTANDO VISTAS --

CREATE OR REPLACE VIEW vista_compras AS
SELECT 
    s.idShopping,
    c.idCliente,
    CONCAT(c.nombres, ' ', c.apellidos) AS nombre_cliente,
    p.idProducto,
    p.nombre AS nombre_producto,
    p.descripcion,
    p.precio AS precio_unitario,
    s.cantidad,
    (p.precio * s.cantidad) AS precio_total,
    s.shopping_date
FROM 
    shoppings s
JOIN 
    clients c ON s.clienteId = c.idCliente
JOIN 
    products p ON s.productId = p.idProducto;


DROP VIEW vista_compras;

-- ALGUNAS CONSULTAS --
SELECT * FROM clients;
SELECT * FROM vehicles;	
SELECT * FROM products;
SELECT * FROM shoppings;





