import express, {Application} from 'express';
import indexRoutes from './routes/indexRoutes';
import usuariosRoutes from './routes/usuariosRoutes';
import rolesRoutes from './routes/rolesRoutes';
import juegosRoutes from './routes/juegosRoutes';
import transaccionesRoutes from './routes/transaccionesRoutes';
import reembolsosRoutes from './routes/reembolsosRoutes';
import carritosRoutes from './routes/carritosRoutes';
import metodo_pagoRoutes from './routes/metodo_pagoRoutes';
import morgan from 'morgan';
import cors from 'cors';

import swaggerDocument from './swagger.json';
import swagger_ui_express from 'swagger-ui-express';
class Server
{
    public app: Application;
    constructor()
    {
        this.app= express();
        this.config();
        this.routes();
        this.app.use('/documentacion',swagger_ui_express.serve, swagger_ui_express.setup(swaggerDocument));
    }
    config (): void
    {
        this.app.set('port',process.env.PORT|| 3000);//En que puerto se va a ejecutar el puerto
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }
    routes (): void
    {
        this.app.use(indexRoutes);
        this.app.use('/api/usuarios',usuariosRoutes);
        this.app.use('/api/roles',rolesRoutes);
        this.app.use('/api/juegos',juegosRoutes);
        this.app.use('/api/transacciones',transaccionesRoutes);
        this.app.use('/api/reembolsos',reembolsosRoutes);
        this.app.use('/api/carritos',carritosRoutes);
        this.app.use('/api/metodo_pago',metodo_pagoRoutes);


    }
    start (): void
    {
        this.app.listen(this.app.get('port'), () =>
        {
            console.log('El servidor se está ejecutando en el puerto: ',this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
