import { Router } from 'express';
class IndexRoutes
{
    public router: Router=Router();
    constructor()
    {
        this.config();
    }
    config() : void
    {
        this.router.get('/',(req,res) => res.send('probando ruta'));//Se definirán las rutas sfjklsadfjkda;fj v;;v;v;v;
    }
}
const indexRoutes= new IndexRoutes();
export default indexRoutes.router;