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
exports.transaccionesController = void 0;
const database_1 = __importDefault(require("../database")); //acceso a la base de datos
class TransaccionesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM transacciones');
            res.json(respuesta);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM transacciones WHERE id = ?', [id]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Transaccion no encontrado' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield database_1.default.query("INSERT INTO transacciones set ?", [req.body]);
            res.json(resp);
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log(req.params);
            const resp = yield database_1.default.query("UPDATE transacciones set ? WHERE id = ?", [req.body, id]);
            res.json(resp);
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM transacciones WHERE id = ${id}`);
            res.json(resp);
        });
    }
    comentario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log(req.params);
            const resp = yield database_1.default.query("UPDATE transacciones set ? WHERE id = ?", [req.body, id]);
            res.json(resp);
        });
    }
    ganancias(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT SUM(J.precio * T.cantidad) AS ganancia_total FROM transacciones T JOIN juegos J ON T.id_juego = J.id LEFT JOIN reembolsos R ON T.id = R.id_transacciones WHERE R.id IS NULL AND J.id_usuario = ? GROUP BY J.id_usuario;', [id]);
            if (respuesta.length > 0) {
                res.json(respuesta);
                return;
            }
            res.status(404).json({ 'mensaje': 'Historial de compras no encontrado' });
        });
    }
    historialCompras(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT T.id,T.fecha_compra,J.titulo,J.precio,T.cantidad FROM transacciones T JOIN juegos J ON T.id_juego = J.id LEFT JOIN reembolsos R ON T.id = R.id_transacciones WHERE R.id IS NULL AND T.id_usuario = ?;', [id]);
            if (respuesta.length > 0) {
                res.json(respuesta);
                console.log(respuesta.length);
                return;
            }
            res.status(404).json({ 'mensaje': 'Historial de compras no encontrado' });
        });
    }
    ganancias2(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = req.body;
            var cadena_C = `SELECT SUM(J.precio * T.cantidad) AS ganancia_total FROM transacciones T JOIN juegos J ON T.id_juego = J.id LEFT JOIN reembolsos R ON T.id = R.id_transacciones WHERE R.id IS NULL AND J.id_usuario = '${respuesta.id_usuario}' GROUP BY J.id_usuario;`;
            const resp = yield database_1.default.query(cadena_C);
            console.log(cadena_C);
            if (resp.length > 0) {
                res.json(resp[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'ganancia no encontrado' });
        });
    }
}
exports.transaccionesController = new TransaccionesController();
