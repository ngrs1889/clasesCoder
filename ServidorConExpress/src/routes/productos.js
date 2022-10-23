const Contenedor = require('../services/Contenedor.js');
const path = require('path');
const fs = require('fs/promises');
const { Router } = require('express')

const pathObj = path.parse(__filename);
const nombreArchivo = path.join(pathObj.dir, '.././productos.json');

const rutaProductos = Router();

const producto = new Contenedor(nombreArchivo);

rutaProductos.get('/', async (req, res) => {
    const productos = await producto.getAll();
    res.json(productos);
}
)



rutaProductos.get('/:id', async (req, res) => {
    const id = req.params.id;
    const productos = await producto.getById(id);
    res.json(productos);
})
let id = 1;





rutaProductos.post('/', async (req, res) => {
    const data = req.body;
    console.log(req.body);

    const { title, price, thumbail } = req.body;
    console.log(title)
    if (!title || !price || !thumbail) {
        return res.status(400).json({
            msg: "campos invalidos :( "
        })
    }

    const nuevoProducto = {
        title,
        price,
        thumbail,

    }

    const ultimo = await producto.save(nuevoProducto);

    res.json({
        msg: 'ok',
        data: ultimo
    })
});




rutaProductos.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { title, price, thumbail } = req.body;
    const productos = await producto.obtenerProductos();


    if (!title || !price || !thumbail) {
        return res.status(400).json({
            msg: "Campos invalidos :( "
        })
    }

    const nuevoProducto = {
        title,
        price,
        thumbail
    }
    let mensaje = "";
    for (let i = 0; i < productos.length; i++) {
        if (id == productos[i].id) {
            mensaje = "cambiando usuario"
        }
    }
    if (mensaje.length == 0) {
        return res.status(400).json({
            msg: "el usuario no existe"
        })
    }


    const nuevo = await producto.putID(id, nuevoProducto)

    res.json({
        msg: mensaje,
        data: nuevo,
    })
})




rutaProductos.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const productos = await producto.obtenerProductos();

    let mensaje = "";
    for (let i = 0; i < productos.length; i++) {
        if (id == productos[i].id) {
            mensaje = "cambiando usuario"
        }
    }
    if (mensaje.length == 0) {
        return res.status(400).json({
            msg: "el usuario no existe"
        })
    }

    mensaje = await producto.deleteById(id);

    res.json({
        msg: `producto seleccionado con ${id}, ${mensaje}`,

    })
})

module.exports = rutaProductos;
