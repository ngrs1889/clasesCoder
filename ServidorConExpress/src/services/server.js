const express = require('express')
const MainRouter = require('../routes/index');


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));
//TODO LO QUE COMIENZA CON /api/productos se resuelve con rutaProductos
app.use('/api', MainRouter);

module.exports = app;