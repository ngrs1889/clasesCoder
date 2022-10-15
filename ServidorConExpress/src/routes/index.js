const { Router } = require('express');
const ProductosRouter = require('./productos');

const rutaProductos = Router();

rutaProductos.use('/productos', ProductosRouter)
module.exports = rutaProductos;