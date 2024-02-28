import { Router } from 'express';
import { metodo_pagoController } from '../controllers/metodo_pagoController';

class Metodo_pagoRoutes
{
    public router: Router=Router();
    constructor()
    {
        this.config();
    }
    config() : void
    {
        this.router.get('/',(req,res) => res.send('probando juegos'));
        this.router.post('/crearMetodoPago/',metodo_pagoController.createMetodoPago);
        this.router.put('/actualizarMetodoPago/:id',metodo_pagoController.actualizarMetodoPago);
        this.router.delete('/eliminarMetodoPago/:id',metodo_pagoController.eliminarMetodoPago);
        this.router.get('/mostrarMetodosPago/',metodo_pagoController.mostrartodos );
        this.router.get('/obtenerMetodoPago/:id', metodo_pagoController.listOne );
        this.router.post('/pagoUsuario/', metodo_pagoController.pagoUsuario );

    }
}

const metodo_pagoRoutes= new Metodo_pagoRoutes();
export default metodo_pagoRoutes.router;