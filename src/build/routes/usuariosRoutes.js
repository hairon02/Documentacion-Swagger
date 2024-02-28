"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuariosController_1 = require("../controllers/usuariosController");
class UsuariosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => res.send('probando usuarios'));
        this.router.post('/crearUsuario/', usuariosController_1.usuariosController.create);
        this.router.put('/actualizar/:id', usuariosController_1.usuariosController.actualizar);
        this.router.delete('/eliminar/:id', usuariosController_1.usuariosController.eliminar);
        this.router.get('/mostrarUsuarios/', usuariosController_1.usuariosController.list);
        this.router.get('/obtenerUsuario/:id', usuariosController_1.usuariosController.listOne);
        this.router.post('/validarUsuario/', usuariosController_1.usuariosController.validarUsuario);
    }
}
const usuariosRoutes = new UsuariosRoutes();
exports.default = usuariosRoutes.router;
