import {Request,Response} from 'express';
import pool from '../database'; //acceso a la base de datos
class TransaccionesController{
    public async list(req: Request, res: Response ): Promise<void>{
        const respuesta = await pool.query('SELECT * FROM transacciones');
        res.json( respuesta );
    }

    public async listOne(req: Request, res: Response): Promise <void>{
    const {id} = req.params;
    const respuesta = await pool.query('SELECT * FROM transacciones WHERE id = ?', [id]);
    if(respuesta.length>0){
        res.json(respuesta[0]);
        return ;
    }
    res.status(404).json({'mensaje': 'Transaccion no encontrado'});}

    public async create(req: Request, res: Response): Promise<void> {
        const resp = await pool.query("INSERT INTO transacciones set ?", [req.body]);
        res.json(resp);
    }
    
    public async actualizar(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    console.log(req.params);
    const resp = await pool.query("UPDATE transacciones set ? WHERE id = ?", [req.body, id]);
    res.json(resp);
    }
    public async eliminar(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const resp = await pool.query(`DELETE FROM transacciones WHERE id = ${id}`);
    res.json(resp);
    }

    public async comentario(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        console.log(req.params);
        const resp = await pool.query("UPDATE transacciones set ? WHERE id = ?", [req.body, id]);
        res.json(resp);
    }

    public async ganancias(req: Request, res: Response): Promise <void>{
        const {id} = req.params;
        const respuesta = await pool.query('SELECT SUM(J.precio * T.cantidad) AS ganancia_total FROM transacciones T JOIN juegos J ON T.id_juego = J.id LEFT JOIN reembolsos R ON T.id = R.id_transacciones WHERE R.id IS NULL AND J.id_usuario = ? GROUP BY J.id_usuario;', [id]);
        if(respuesta.length>0){
            res.json(respuesta);
            return ;
        }
        res.status(404).json({'mensaje': 'Historial de compras no encontrado'});
    }

    public async historialCompras(req: Request, res: Response): Promise <void>{
        const {id} = req.params;
        const respuesta = await pool.query('SELECT T.id,T.fecha_compra,J.titulo,J.precio,T.cantidad FROM transacciones T JOIN juegos J ON T.id_juego = J.id LEFT JOIN reembolsos R ON T.id = R.id_transacciones WHERE R.id IS NULL AND T.id_usuario = ?;', [id]);
        if(respuesta.length>0){
            res.json(respuesta);
            console.log(respuesta.length);
            return ;
        }
        res.status(404).json({'mensaje': 'Historial de compras no encontrado'});
    }
    
    public async ganancias2(req: Request, res: Response ): Promise<void>{
        const respuesta = req.body;
        var cadena_C =`SELECT SUM(J.precio * T.cantidad) AS ganancia_total FROM transacciones T JOIN juegos J ON T.id_juego = J.id LEFT JOIN reembolsos R ON T.id = R.id_transacciones WHERE R.id IS NULL AND J.id_usuario = '${respuesta.id_usuario}' GROUP BY J.id_usuario;`;
        const resp = await pool.query(cadena_C);
        console.log(cadena_C)
        if(resp.length>0)
        {
            res.json(resp[0]);
            return;
        }
        res.status(404).json({'mensaje': 'ganancia no encontrado'});
    }

   
}

export const transaccionesController = new TransaccionesController();
