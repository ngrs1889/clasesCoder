const fs = require('fs');
const path = require('path');

const nombreArchivo = "productos.json"
const pathObj = path.parse(__filename);
const archivoRuta = path.join(pathObj.dir,nombreArchivo);

class Contenedor { 
    constructor(nombreArchivo){
            this.nombreArchivo = nombreArchivo;
    }
    
async obtenerProductos(){
    const dato = await fs.promises.readFile(nombreArchivo, 'utf-8');
    return JSON.parse(dato);
}

async saveProductos(productos){
    const data = JSON.stringify(productos, null, '\t');
    JSON.stringify(productos, null, '\t');
    await fs.promises.writeFile(nombreArchivo, data)
}

async getAll(){
const productos = await this.obtenerProductos();
return productos;
}

async getById(id) {
    const productos = await this.obtenerProductos();
    const indice = productos.findIndex((unProducto) => unProducto.id === id);

    if(indice <0) {
        return('El producto no existe');
    }

    return productos[indice];
}

async save(data){
    if(!data.title || !data.price || typeof data.title !== 'string' || typeof data.price !== 'number') throw new Error('Datos invalidos');
    const productos = await this.obtenerProductos();

    let id = 1
    if(productos.length){
        id = productos[productos.length -1].id + 1
    }
    const nuevoProducto = {
        title: data.title,
        price: data.price,
        id: id
    }

    productos.push(nuevoProducto);

    await this.saveProductos(productos);
}

async deleteById(idBuscado){
    const productos = await this.obtenerProductos();

    const indice = productos.findIndex((unProducto) => unProducto.id === idBuscado);

    if(indice<0){
        console.log("no se pudo eliminar");
        return;
    }

    productos.splice(indice,1);

    this.saveProductos(productos);
    console.log("se elimino correctamente");
}

async deleteAll(){
    this.saveProductos([]);
}
}

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

