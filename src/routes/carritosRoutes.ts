import { Router } from 'express';
import { carritosController } from '../controllers/carritosController';

class CarritosRoutes
{
    public router: Router=Router();
    constructor()
    {
        this.config();
    }
    config() : void
    {
        this.router.get('/',(req,res) => res.send('probando usuarios'));
        this.router.post('/crearCarrito/',carritosController.create);
        this.router.put('/actualizar/:id',carritosController.actualizar);
        this.router.delete('/eliminar/:id',carritosController.eliminar);
        this.router.get('/mostrarCarritos/', carritosController.list );
        this.router.get('/obtenerCarrito/:id', carritosController.listOne );
        this.router.post('/mostrarCarritoUsuario/', carritosController.mostrarCarritoUsuario );
        this.router.get('/mostrarCarroUsuario/:id', carritosController.mostrarCarroUsuario );
        this.router.delete('/eliminarporUsuario/:id',carritosController.eliminarporUsuario);

    }
}
const carritosRoutes= new CarritosRoutes();
export default carritosRoutes.router