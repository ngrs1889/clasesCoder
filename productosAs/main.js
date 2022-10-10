const Contenedor = require('./Contenedor.js');
const path = require('path');

const pathObj = path.parse(__filename);

const nombreArchivo = path.join(pathObj.dir,'productos.json');

const producto = new Contenedor(nombreArchivo);


const main = async () => {
    console.log('1) Save ')
    const Unproducto = { title: 'ropa', price: 24};
    await producto.save(Unproducto);
    console.log(await producto.getAll());

    console.log('2) getById ')
    const dosProducto = await producto.getById(1);
    console.log(dosProducto);

    console.log('3) getAll ') 
    const productos = await producto.getAll();
    console.log(productos);

    console.log('4) deleteById ')
    await producto.deleteById(1);
    console.log(await producto.getAll());

    console.log('5) deleteAll ')
    await producto.deleteAll();
    console.log(await producto.getAll());
    
}

main();