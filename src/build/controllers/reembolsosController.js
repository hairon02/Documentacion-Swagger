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
exports.reembolsosController = void 0;
const database_1 = __importDefault(require("../database")); //acceso a la base de datos
class ReembolsosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM reembolsos');
            res.json(respuesta);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM reembolsos WHERE id = ?', [id]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Transaccion no encontrado' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield database_1.default.query("INSERT INTO reembolsos set ?", [req.body]);
            res.json(resp);
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log(req.params);
            const resp = yield database_1.default.query("UPDATE reembolsos set ? WHERE id = ?", [req.body, id]);
            res.json(resp);
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM reembolsos WHERE id = ${id}`);
            res.json(resp);
        });
    }
    reembolsoUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = req.body;
            var cadena_C = `SELECT r.fecha_reembolso, j.titulo FROM reembolsos r JOIN transacciones t ON r.id_transacciones = t.id JOIN juegos j ON t.id_juego = j.id WHERE t.id_usuario = '${respuesta.id_usuario}'`;
            const resp = yield database_1.default.query(cadena_C);
            console.log(cadena_C);
            if (resp.length > 0) {
                res.json(resp);
                return;
            }
            res.status(404).json({ 'mensaje': 'Usuario no encontrado' });
        });
    }
}
exports.reembolsosController = new ReembolsosController();
