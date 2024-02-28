"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carritosController = void 0;
const database_1 = __importDefault(require("../database"));
class CarritosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM carrito');
            res.json(respuesta);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM carrito WHERE id = ?', [id]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Usuario no encontrado' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield database_1.default.query("INSERT INTO carrito set ?", [req.body]);
            var cadena_C = `SELECT * FROM carrito WHERE id = '${resp.insertId}' `;
            const resp1 = yield database_1.default.query(cadena_C);
            console.log(cadena_C);
            if (resp1.length > 0) {
                res.json(resp1[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Carrito no encontrado' });
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log(req.params);
            const resp = yield database_1.default.query("UPDATE carrito set ? WHERE id = ?", [req.body, id]);
            res.json(resp);
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM carrito WHERE id = ${id}`);
            res.json(resp);
        });
    }
    mostrarCarritoUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = req.body;
            var cadena_C = `SELECT * FROM carrito WHERE id_usuarios = '${respuesta.id_usuarios}'`;
            const resp = yield database_1.default.query(cadena_C);
            console.log(cadena_C);
            if (resp.length > 0) {
                res.json(resp);
                return;
            }
            res.status(404).json({ 'mensaje': 'Usuario no encontrado' });
        });
    }
    bibliotecaJugador(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            //const respuesta = await pool.query(`SELECT j.titulo FROM juegos j JOIN transacciones t ON t.id_juego = j.id WHERE t.id_usuario = ?`, [id]);
            const respuesta = yield database_1.default.query(`SELECT j.titulo FROM juegos j JOIN transacciones t ON t.id_juego = j.id LEFT JOIN reembolsos r ON t.id = r.id_transacciones WHERE r.id_transacciones IS NULL AND t.id_usuario = ?`, [id]);
            if (respuesta.length > 0) {
                res.json(respuesta);
                return;
            }
            /*
            
            LEFT JOIN Reembolsos r ON t.id = r.id_transacciones
            WHERE t.id_usuario = ? AND Reembolsos.id_transacciones IS NULL;
     ?*/
        });
    }
    mostrarCarroUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query(`SELECT c.id,j.titulo, c.cantidad,c.id_juegos FROM carrito c JOIN juegos j ON c.id_juegos=j.id AND c.id_usuarios = ?`, [id]);
            if (respuesta.length > 0) {
                res.json(respuesta);
                return;
            }
        });
    }
    eliminarporUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM carrito WHERE id_usuarios = ${id}`);
            res.json(resp);
        });
    }
}
exports.carritosController = new CarritosController();
