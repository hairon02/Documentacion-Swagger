import {Request,Response} from 'express';
import pool from '../database';
class CarritosController
{
    public async list(req: Request, res: Response ): Promise<void>{
        const respuesta = await pool.query('SELECT * FROM carrito');
        res.json( respuesta );
    }

    public async listOne(req: Request, res: Response): Promise <void>{
    const {id} = req.params;
    const respuesta = await pool.query('SELECT * FROM carrito WHERE id = ?', [id]);
    if(respuesta.length>0){
        res.json(respuesta[0]);
        return ;
    }
    res.status(404).json({'mensaje': 'Usuario no encontrado'});}

    public async create(req: Request, res: Response): Promise<void> {
        const resp = await pool.query("INSERT INTO carrito set ?", [req.body]);
        var cadena_C =`SELECT * FROM carrito WHERE id = '${resp.insertId}' `;
        const resp1 = await pool.query(cadena_C);
        console.log(cadena_C)
        if(resp1.length>0)
        {
            res.json(resp1[0]);
            return;
        }
        res.status(404).json({'mensaje': 'Carrito no encontrado'});
        
    }
    
    public async actualizar(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    console.log(req.params);
    const resp = await pool.query("UPDATE carrito set ? WHERE id = ?", [req.body, id]);
    res.json(resp);
    }
    public async eliminar(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const resp = await pool.query(`DELETE FROM carrito WHERE id = ${id}`);
    res.json(resp);
    }

    public async mostrarCarritoUsuario(req: Request, res: Response): Promise <void>{
        const respuesta = req.body;
        var cadena_C =`SELECT * FROM carrito WHERE id_usuarios = '${respuesta.id_usuarios}'`;
        const resp = await pool.query(cadena_C);
        console.log(cadena_C)
        if(resp.length>0)
        {
            res.json(resp);
            return;
        }
        res.status(404).json({'mensaje': 'Usuario no encontrado'});
        
    }
    public async bibliotecaJugador(req: Request, res: Response): Promise <void>{
        const {id} = req.params;
        //const respuesta = await pool.query(`SELECT j.titulo FROM juegos j JOIN transacciones t ON t.id_juego = j.id WHERE t.id_usuario = ?`, [id]);
        const respuesta = await pool.query(`SELECT j.titulo FROM juegos j JOIN transacciones t ON t.id_juego = j.id LEFT JOIN reembolsos r ON t.id = r.id_transacciones WHERE r.id_transacciones IS NULL AND t.id_usuario = ?`, [id]);
        if(respuesta.length>0){
            res.json(respuesta);
            return ;
        }
        /*
        
        LEFT JOIN Reembolsos r ON t.id = r.id_transacciones
        WHERE t.id_usuario = ? AND Reembolsos.id_transacciones IS NULL;
 ?*/
    }
    public async mostrarCarroUsuario(req: Request, res: Response): Promise <void>{
        const {id} = req.params;
        const respuesta = await pool.query(`SELECT c.id,j.titulo, c.cantidad,c.id_juegos FROM carrito c JOIN juegos j ON c.id_juegos=j.id AND c.id_usuarios = ?`, [id]);
        if(respuesta.length>0){
            res.json(respuesta);
            return ;
        }
    }

    public async eliminarporUsuario(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query(`DELETE FROM carrito WHERE id_usuarios = ${id}`);
        res.json(resp);
        }
}
export const carritosController = new CarritosController();