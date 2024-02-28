"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const usuariosRoutes_1 = __importDefault(require("./routes/usuariosRoutes"));
const rolesRoutes_1 = __importDefault(require("./routes/rolesRoutes"));
const juegosRoutes_1 = __importDefault(require("./routes/juegosRoutes"));
const transaccionesRoutes_1 = __importDefault(require("./routes/transaccionesRoutes"));
const reembolsosRoutes_1 = __importDefault(require("./routes/reembolsosRoutes"));
const carritosRoutes_1 = __importDefault(require("./routes/carritosRoutes"));
const metodo_pagoRoutes_1 = __importDefault(require("./routes/metodo_pagoRoutes"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
        this.app.use('/documentacion', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
    }
    config() {
        this.app.set('port', process.env.PORT || 3000); //En que puerto se va a ejecutar el puerto
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use(indexRoutes_1.default);
        this.app.use('/api/usuarios', usuariosRoutes_1.default);
        this.app.use('/api/roles', rolesRoutes_1.default);
        this.app.use('/api/juegos', juegosRoutes_1.default);
        this.app.use('/api/transacciones', transaccionesRoutes_1.default);
        this.app.use('/api/reembolsos', reembolsosRoutes_1.default);
        this.app.use('/api/carritos', carritosRoutes_1.default);
        this.app.use('/api/metodo_pago', metodo_pagoRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('El servidor se está ejecutando en el puerto: ', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
