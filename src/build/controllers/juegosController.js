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
exports.juegosController = void 0;
const database_1 = __importDefault(require("../database")); //acceso a la base de datos
class JuegosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM juegos');
            res.json(respuesta);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM juegos WHERE id = ?', [id]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Juego no encontrado' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield database_1.default.query("INSERT INTO juegos set ?", [req.body]);
            res.json(resp);
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log(req.params);
            const resp = yield database_1.default.query("UPDATE juegos set ? WHERE id = ?", [req.body, id]);
            res.json(resp);
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM juegos WHERE id = ${id}`);
            res.json(resp);
        });
    }
    mostrarJuegoGenero(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = req.body;
            var cadena_C = `SELECT * FROM juegos WHERE genero = '${respuesta.genero}' AND estado='alta'`;
            const resp = yield database_1.default.query(cadena_C);
            console.log(cadena_C);
            if (resp.length > 0) {
                res.json(resp);
                return;
            }
            res.status(404).json({ 'mensaje': 'Juegos no encontrado' });
        });
    }
    busquedaTitulo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = req.body;
            var cadena_C = `SELECT * FROM juegos WHERE titulo = '${respuesta.titulo}' AND estado='alta'`;
            const resp = yield database_1.default.query(cadena_C);
            console.log(cadena_C);
            if (resp.length > 0) {
                res.json(resp);
                return;
            }
            res.status(404).json({ 'mensaje': 'Titulo del juego no encontrado' });
        });
    }
    bibliotecaJugador(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            //const respuesta = await pool.query(`SELECT j.titulo FROM juegos j JOIN transacciones t ON t.id_juego = j.id WHERE t.id_usuario = ?`, [id]);
            const respuesta = yield database_1.default.query(`SELECT j.id,j.titulo,j.descripcion,j.genero,j.fecha_lanzamiento,j.precio FROM juegos j JOIN transacciones t ON t.id_juego = j.id LEFT JOIN reembolsos r ON t.id = r.id_transacciones WHERE r.id_transacciones IS NULL AND t.id_usuario = ?`, [id]);
            if (respuesta.length > 0) {
                res.json(respuesta);
                return;
            }
        });
    }
    juegoVendedor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            //const respuesta = await pool.query(`SELECT j.titulo FROM juegos j JOIN transacciones t ON t.id_juego = j.id WHERE t.id_usuario = ?`, [id]);
            const respuesta = yield database_1.default.query(`SELECT j.id,j.titulo,j.descripcion,j.genero,j.fecha_lanzamiento,j.precio,j.estado,j.id_usuario FROM juegos j WHERE j.id_usuario = ?`, [id]);
            if (respuesta.length > 0) {
                res.json(respuesta);
                return;
            }
        });
    }
    bajaJuego(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log(req.params);
            const resp = yield database_1.default.query("UPDATE juegos set estado='baja' WHERE id = ?", [id]); // requiero id Juego, modificar el set para que haga estado = baja
            res.json(resp);
        });
    }
    mostrarJuegosDisponibles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query("SELECT * FROM juegos WHERE estado='alta' ");
            res.json(respuesta);
        });
    }
}
exports.juegosController = new JuegosController();
