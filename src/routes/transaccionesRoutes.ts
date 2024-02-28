import { Router } from 'express';
import { transaccionesController } from '../controllers/transaccionesController';

class TransaccionesController
{
    public router: Router=Router();
    constructor()
    {
        this.config();
    }
    config() : void
    {
        this.router.get('/',(req,res) => res.send('probando juegos'));
        this.router.post('/crearTransaccion/',transaccionesController.create);
        this.router.put('/actualizar/:id',transaccionesController.actualizar);
        this.router.delete('/eliminar/:id',transaccionesController.eliminar);
        this.router.get('/mostrarTransacciones/', transaccionesController.list );
        this.router.get('/obtenerTransaccion/:id', transaccionesController.listOne );
        this.router.put('/CalificarJuego/:id',transaccionesController.comentario);
        this.router.get('/historialCompras/:id',transaccionesController.historialCompras);
        this.router.get('/gananciaTotal/:id',transaccionesController.ganancias);
        this.router.post('/ganancias2/',transaccionesController.ganancias2);
    }
}

const transaccionesRoutes= new TransaccionesController();
export default transaccionesRoutes.router;