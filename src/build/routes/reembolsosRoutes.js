"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reembolsosController_1 = require("../controllers/reembolsosController");
class ReembolsosController {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => res.send('probando juegos'));
        this.router.post('/crearReembolso/', reembolsosController_1.reembolsosController.create);
        this.router.put('/actualizar/:id', reembolsosController_1.reembolsosController.actualizar);
        this.router.delete('/eliminar/:id', reembolsosController_1.reembolsosController.eliminar);
        this.router.get('/mostrarReembolsos/', reembolsosController_1.reembolsosController.list);
        this.router.get('/obtenerReembolso/:id', reembolsosController_1.reembolsosController.listOne);
        this.router.post('/reembolsoUsuario/', reembolsosController_1.reembolsosController.reembolsoUsuario);
    }
}
const reembolsosRoutes = new ReembolsosController();
exports.default = reembolsosRoutes.router;
