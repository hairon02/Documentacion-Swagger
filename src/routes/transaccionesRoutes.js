"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaccionesController_1 = require("../controllers/transaccionesController");
class TransaccionesController {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => res.send('probando juegos'));
        this.router.post('/crearTransaccion/', transaccionesController_1.transaccionesController.create);
        this.router.put('/actualizar/:id', transaccionesController_1.transaccionesController.actualizar);
        this.router.delete('/eliminar/:id', transaccionesController_1.transaccionesController.eliminar);
        this.router.get('/mostrarTransacciones/', transaccionesController_1.transaccionesController.list);
        this.router.get('/obtenerTransaccion/:id', transaccionesController_1.transaccionesController.listOne);
        this.router.put('/CalificarJuego/:id', transaccionesController_1.transaccionesController.comentario);
        this.router.get('/historialCompras/:id', transaccionesController_1.transaccionesController.historialCompras);
        this.router.get('/gananciaTotal/:id', transaccionesController_1.transaccionesController.ganancias);
        this.router.post('/ganancias2/', transaccionesController_1.transaccionesController.ganancias2);
    }
}
const transaccionesRoutes = new TransaccionesController();
exports.default = transaccionesRoutes.router;
