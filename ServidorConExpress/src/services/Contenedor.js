const fs = require('fs');


class Contenedor { 
    constructor(archivoRuta){
            this.archivoRuta = archivoRuta;
    }
    
async obtenerProductos(){
    const dato = await fs.promises.readFile(this.archivoRuta, 'utf-8');
    return JSON.parse(dato);
}

async saveProductos(productos){
    const data = JSON.stringify(productos, null, '\t');
    JSON.stringify(productos, null, '\t');
    await fs.promises.writeFile(this.archivoRuta, data)
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

async getProductoRandom() {
    const productos = await this.obtenerProductos();
    const limiteMaximo = productos.length;

    const random = Math.floor(Math.random() * limiteMaximo)
    return productos[random];
}


async save(data){
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

    return nuevoProducto;
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


async putID(id, nuevoProducto){
    const productos = await this.obtenerProductos();
    const title = nuevoProducto.title;
    const price = nuevoProducto.price;

    const productoGuardar = {
        title,
        price,
        id
    }

    productos.splice(id, 1, productoGuardar);
    this.saveProductos(productos);

    return productoGuardar;
}

}

module.exports=Contenedor;

