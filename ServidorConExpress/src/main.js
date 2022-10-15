const express = require('express')
const Contenedor = require('./Contenedor.js');
const path = require('path');
const { appendFile } = require('fs');

const app = express();
const puerto = process.env.puerto || 8080;
const server = app.listen(puerto, () =>
  console.log('Server up en puerto', puerto)
);

server.on('error', (err) => {
  console.log('ERROR ATAJADO', err);
});

const pathObj = path.parse(__filename);
const nombreArchivo = path.join(pathObj.dir,'productos.json');

const producto = new Contenedor(nombreArchivo);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/productos', async (req, res) => {
    const productos = await producto.getAll();
        res.json(productos);
}
)


app.get('/productosRandom', async (req, res) => {
    const productos = await producto.getProductoRandom();
    res.json(productos);
    })
