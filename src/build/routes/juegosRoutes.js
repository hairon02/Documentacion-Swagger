"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const juegosController_1 = require("../controllers/juegosController");
class JuegosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => res.send('probando juegos'));
        this.router.post('/crearJuego/', juegosController_1.juegosController.create);
        this.router.put('/actualizar/:id', juegosController_1.juegosController.actualizar);
        this.router.put('/estadoJuego/:id', juegosController_1.juegosController.actualizar);
        this.router.delete('/eliminar/:id', juegosController_1.juegosController.eliminar);
        this.router.get('/mostrarJuegos/', juegosController_1.juegosController.list);
        this.router.get('/obtenerJuego/:id', juegosController_1.juegosController.listOne);
        this.router.post('/mostrarJuegoGenero/', juegosController_1.juegosController.mostrarJuegoGenero);
        this.router.post('/juegoTitulo/', juegosController_1.juegosController.busquedaTitulo);
        this.router.get('/bibliotecaJugador/:id', juegosController_1.juegosController.bibliotecaJugador);
        this.router.get('/juegoVendedor/:id', juegosController_1.juegosController.juegoVendedor);
        this.router.get('/mostrarJuegosDisponibles/', juegosController_1.juegosController.mostrarJuegosDisponibles);
    }
}
const juegosRoutes = new JuegosRoutes();
exports.default = juegosRoutes.router;
