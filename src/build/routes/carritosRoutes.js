"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carritosController_1 = require("../controllers/carritosController");
class CarritosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => res.send('probando usuarios'));
        this.router.post('/crearCarrito/', carritosController_1.carritosController.create);
        this.router.put('/actualizar/:id', carritosController_1.carritosController.actualizar);
        this.router.delete('/eliminar/:id', carritosController_1.carritosController.eliminar);
        this.router.get('/mostrarCarritos/', carritosController_1.carritosController.list);
        this.router.get('/obtenerCarrito/:id', carritosController_1.carritosController.listOne);
        this.router.post('/mostrarCarritoUsuario/', carritosController_1.carritosController.mostrarCarritoUsuario);
        this.router.get('/mostrarCarroUsuario/:id', carritosController_1.carritosController.mostrarCarroUsuario);
        this.router.delete('/eliminarporUsuario/:id', carritosController_1.carritosController.eliminarporUsuario);
    }
}
const carritosRoutes = new CarritosRoutes();
exports.default = carritosRoutes.router;
