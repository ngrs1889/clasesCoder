const Contenedor = require('../services/Contenedor.js');
const path = require('path');
const fs = require('fs/promises');
const { Router } = require('express')

const pathObj = path.parse(__filename);
const nombreArchivo = path.join(pathObj.dir,'.././productos.json');

const rutaProductos = Router();

const producto = new Contenedor(nombreArchivo);

rutaProductos.get('/', async (req, res) => {
    const productos = await producto.getAll();
        res.json(productos);
}
)

rutaProductos.get('/:id', async (req, res) => {
    const productos = await producto.getById();
    res.json(productos);
    })
    let id = 1;
    module.exports = rutaProductos;

rutaProductos.post('/', async (req, res) => {
    const data = req.body;
    console.log(req.body);
    const productoss = await producto.obtenerProductos();
    id = productoss[productoss.length -1].id
    const { title, price} = req.body;

    if (!title || !price){
        return res.status(400).json({
            msg:"campos invalidos :( " 
        })
    }

    const nuevoProducto = {
        title,
        price,
        
    }

	const ultimo = await producto.save(nuevoProducto);

	res.json({
		msg: 'ok',
		data: ultimo
})
});