import { Router } from 'express';
import { juegosController } from '../controllers/juegosController';

class JuegosRoutes
{
    public router: Router=Router();
    constructor()
    {
        this.config();
    }
    config() : void
    {
        this.router.get('/',(req,res) => res.send('probando juegos'));
        this.router.post('/crearJuego/',juegosController.create);
        this.router.put('/actualizar/:id',juegosController.actualizar);
        this.router.put('/estadoJuego/:id',juegosController.actualizar);
        this.router.delete('/eliminar/:id',juegosController.eliminar);
        this.router.get('/mostrarJuegos/', juegosController.list );
        this.router.get('/obtenerJuego/:id', juegosController.listOne );
        this.router.post('/mostrarJuegoGenero/', juegosController.mostrarJuegoGenero );
        this.router.post('/juegoTitulo/', juegosController.busquedaTitulo );
        this.router.get('/bibliotecaJugador/:id', juegosController.bibliotecaJugador);
        this.router.get('/juegoVendedor/:id', juegosController.juegoVendedor);
        this.router.get('/mostrarJuegosDisponibles/', juegosController.mostrarJuegosDisponibles );

    }
}

const juegosRoutes= new JuegosRoutes();
export default juegosRoutes.router;