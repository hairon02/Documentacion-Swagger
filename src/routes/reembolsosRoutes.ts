import { Router } from 'express';
import { reembolsosController } from '../controllers/reembolsosController';

class ReembolsosController
{
    public router: Router=Router();
    constructor()
    {
        this.config();
    }
    config() : void
    {
        this.router.get('/',(req,res) => res.send('probando juegos'));
        this.router.post('/crearReembolso/',reembolsosController.create);
        this.router.put('/actualizar/:id',reembolsosController.actualizar);
        this.router.delete('/eliminar/:id',reembolsosController.eliminar);
        this.router.get('/mostrarReembolsos/', reembolsosController.list );
        this.router.get('/obtenerReembolso/:id', reembolsosController.listOne );
        this.router.post('/reembolsoUsuario/', reembolsosController.reembolsoUsuario );

    }
}

const reembolsosRoutes= new ReembolsosController();
export default reembolsosRoutes.router;