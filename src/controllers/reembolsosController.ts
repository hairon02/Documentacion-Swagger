import {Request,Response} from 'express';
import pool from '../database'; //acceso a la base de datos
class ReembolsosController{
    public async list(req: Request, res: Response ): Promise<void>{
        const respuesta = await pool.query('SELECT * FROM reembolsos');
        res.json( respuesta );
    }

    public async listOne(req: Request, res: Response): Promise <void>{
    const {id} = req.params;
    const respuesta = await pool.query('SELECT * FROM reembolsos WHERE id = ?', [id]);
    if(respuesta.length>0){
        res.json(respuesta[0]);
        return ;
    }
    res.status(404).json({'mensaje': 'Transaccion no encontrado'});}

    public async create(req: Request, res: Response): Promise<void> {
        const resp = await pool.query("INSERT INTO reembolsos set ?", [req.body]);
        res.json(resp);
    }
    
    public async actualizar(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    console.log(req.params);
    const resp = await pool.query("UPDATE reembolsos set ? WHERE id = ?", [req.body, id]);
    res.json(resp);
    }
    public async eliminar(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const resp = await pool.query(`DELETE FROM reembolsos WHERE id = ${id}`);
    res.json(resp);
    }

    public async reembolsoUsuario(req: Request, res: Response): Promise <void>{
        const respuesta = req.body;
        var cadena_C =`SELECT r.fecha_reembolso, j.titulo FROM reembolsos r JOIN transacciones t ON r.id_transacciones = t.id JOIN juegos j ON t.id_juego = j.id WHERE t.id_usuario = '${respuesta.id_usuario}'`;
        const resp = await pool.query(cadena_C);
        console.log(cadena_C)
        if(resp.length>0)
        {
            res.json(resp);
            return;
        }
        res.status(404).json({'mensaje': 'Usuario no encontrado'});
    }
}
export const reembolsosController = new ReembolsosController();