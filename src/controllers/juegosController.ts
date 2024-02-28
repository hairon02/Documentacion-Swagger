import {Request,Response} from 'express';
import pool from '../database'; //acceso a la base de datos
class JuegosController{
    public async list(req: Request, res: Response ): Promise<void>{
        const respuesta = await pool.query('SELECT * FROM juegos');
        res.json( respuesta );
    }

    public async listOne(req: Request, res: Response): Promise <void>{
    const {id} = req.params;
    const respuesta = await pool.query('SELECT * FROM juegos WHERE id = ?', [id]);
    if(respuesta.length>0){
        res.json(respuesta[0]);
        return ;
    }
    res.status(404).json({'mensaje': 'Juego no encontrado'});}

    public async create(req: Request, res: Response): Promise<void> {
        const resp = await pool.query("INSERT INTO juegos set ?", [req.body]);
        res.json(resp);
    }
    
    public async actualizar(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    console.log(req.params);
    const resp = await pool.query("UPDATE juegos set ? WHERE id = ?", [req.body, id]);
    res.json(resp);
    }
    public async eliminar(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const resp = await pool.query(`DELETE FROM juegos WHERE id = ${id}`);
    res.json(resp);
    }

    public async mostrarJuegoGenero(req: Request, res: Response ): Promise<void>{
        const respuesta = req.body;
        var cadena_C =`SELECT * FROM juegos WHERE genero = '${respuesta.genero}' AND estado='alta'`;
        const resp = await pool.query(cadena_C);
        console.log(cadena_C)
        if(resp.length>0)
        {
            res.json(resp);
            return;
        }
        res.status(404).json({'mensaje': 'Juegos no encontrado'});
    }
    public async busquedaTitulo(req: Request, res: Response ): Promise<void>{
        const respuesta = req.body;
        var cadena_C =`SELECT * FROM juegos WHERE titulo = '${respuesta.titulo}' AND estado='alta'`;
        const resp = await pool.query(cadena_C);
        console.log(cadena_C)
        if(resp.length>0)
        {
            res.json(resp);
            return;
        }
        res.status(404).json({'mensaje': 'Titulo del juego no encontrado'});
    }

    public async bibliotecaJugador(req: Request, res: Response): Promise <void>{
        const {id} = req.params;
        //const respuesta = await pool.query(`SELECT j.titulo FROM juegos j JOIN transacciones t ON t.id_juego = j.id WHERE t.id_usuario = ?`, [id]);
        const respuesta = await pool.query(`SELECT j.id,j.titulo,j.descripcion,j.genero,j.fecha_lanzamiento,j.precio FROM juegos j JOIN transacciones t ON t.id_juego = j.id LEFT JOIN reembolsos r ON t.id = r.id_transacciones WHERE r.id_transacciones IS NULL AND t.id_usuario = ?`, [id]);
        if(respuesta.length>0){
            res.json(respuesta);
            return ;
        }
        
    }
    public async juegoVendedor(req: Request, res: Response): Promise <void>{
        const {id} = req.params;
        //const respuesta = await pool.query(`SELECT j.titulo FROM juegos j JOIN transacciones t ON t.id_juego = j.id WHERE t.id_usuario = ?`, [id]);
        const respuesta = await pool.query(`SELECT j.id,j.titulo,j.descripcion,j.genero,j.fecha_lanzamiento,j.precio,j.estado,j.id_usuario FROM juegos j WHERE j.id_usuario = ?`, [id]);
        if(respuesta.length>0){
            res.json(respuesta);
            return ;
        }
        
    }
    public async bajaJuego(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        console.log(req.params);
        const resp = await pool.query("UPDATE juegos set estado='baja' WHERE id = ?", [id]);// requiero id Juego, modificar el set para que haga estado = baja
        res.json(resp);
    }

    public async mostrarJuegosDisponibles(req: Request, res: Response ): Promise<void>{
        const respuesta = await pool.query("SELECT * FROM juegos WHERE estado='alta' ");
        res.json( respuesta );
    }
}

export const juegosController = new JuegosController();
