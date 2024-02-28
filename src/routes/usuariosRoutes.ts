import { Router } from 'express';
import { usuariosController } from '../controllers/usuariosController';

class UsuariosRoutes
{
    public router: Router=Router();
    constructor()
    {
        this.config();
    }
    config() : void
    {
        this.router.get('/',(req,res) => res.send('probando usuarios'));
        this.router.post('/crearUsuario/',usuariosController.create);
        this.router.put('/actualizar/:id',usuariosController.actualizar);
        this.router.delete('/eliminar/:id',usuariosController.eliminar);
        this.router.get('/mostrarUsuarios/', usuariosController.list );
        this.router.get('/obtenerUsuario/:id', usuariosController.listOne );
        this.router.post('/validarUsuario/', usuariosController.validarUsuario );
    }
}
const usuariosRoutes= new UsuariosRoutes();
export default usuariosRoutes.router