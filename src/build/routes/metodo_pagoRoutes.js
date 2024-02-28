"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const metodo_pagoController_1 = require("../controllers/metodo_pagoController");
class Metodo_pagoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => res.send('probando juegos'));
        this.router.post('/crearMetodoPago/', metodo_pagoController_1.metodo_pagoController.createMetodoPago);
        this.router.put('/actualizarMetodoPago/:id', metodo_pagoController_1.metodo_pagoController.actualizarMetodoPago);
        this.router.delete('/eliminarMetodoPago/:id', metodo_pagoController_1.metodo_pagoController.eliminarMetodoPago);
        this.router.get('/mostrarMetodosPago/', metodo_pagoController_1.metodo_pagoController.mostrartodos);
        this.router.get('/obtenerMetodoPago/:id', metodo_pagoController_1.metodo_pagoController.listOne);
        this.router.post('/pagoUsuario/', metodo_pagoController_1.metodo_pagoController.pagoUsuario);
    }
}
const metodo_pagoRoutes = new Metodo_pagoRoutes();
exports.default = metodo_pagoRoutes.router;
