import {Request,Response} from 'express';
import pool from '../database';
class UsuariosController
{
    public async list(req: Request, res: Response ): Promise<void>{
        const respuesta = await pool.query('SELECT * FROM usuarios');
        res.json( respuesta );
    }

    public async listOne(req: Request, res: Response): Promise <void>{
    const {id} = req.params;
    const respuesta = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    if(respuesta.length>0){
        res.json(respuesta[0]);
        return ;
    }
    res.status(404).json({'mensaje': 'Usuario no encontrado'});}

    public async create(req: Request, res: Response): Promise<void> {
        const resp = await pool.query("INSERT INTO usuarios set ?", [req.body]);
        var cadena_C =`SELECT * FROM usuarios WHERE id = '${resp.insertId}' `;
        const resp1 = await pool.query(cadena_C);
        console.log(cadena_C)
        if(resp1.length>0)
        {
            res.json(resp1[0]);
            return;
        }
        res.status(404).json({'mensaje': 'Usuario no encontrado'});
    }
    
    public async actualizar(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    console.log(req.params);
    const resp = await pool.query("UPDATE usuarios set ? WHERE id = ?", [req.body, id]);
    res.json(resp);
    }
    public async eliminar(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const resp = await pool.query(`DELETE FROM usuarios WHERE id = ${id}`);
    res.json(resp);
    }

    public async validarUsuario(req: Request, res: Response ): Promise<void>
    {
        const respuesta = req.body;
        var cadena_C =`SELECT * FROM usuarios WHERE correo = '${respuesta.correo}' AND password = '${respuesta.password}' `;
        const resp = await pool.query(cadena_C);
        console.log(cadena_C)
        if(resp.length>0)
        {
            res.json(resp[0]);
            return;
        }
        res.status(404).json({'mensaje': 'Usuario no encontrado'});

    }
    
}
export const usuariosController = new UsuariosController();