import {Request,Response} from 'express';
import pool from '../database'; //acceso a la base de datos
class Metodo_pagoController
    {
    public async mostrartodos(req: Request, res: Response ): Promise<void>{
        const respuesta = await pool.query('SELECT * FROM  metodo_pago');
        res.json( respuesta );
    }
    public async listOne(req: Request, res: Response): Promise <void>{
        const {id} = req.params;
        const respuesta = await pool.query('SELECT * FROM metodo_pago WHERE id = ?', [id]);
        if(respuesta.length>0){
            res.json(respuesta[0]);
            return ;
        }
        res.status(404).json({'mensaje': 'Metodo de Pago no encontrado'});
    }
    //aqui va el crud
    public async createMetodoPago(req: Request, res: Response): Promise<void> {
        const resp = await pool.query("INSERT INTO metodo_pago set ?",[req.body]);
        res.json(resp);
        //res.json(null);
    }

    public async actualizarMetodoPago(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        console.log(id);
        const resp = await pool.query("UPDATE metodo_pago set ? WHERE id = ?", [req.body, id]);
        res.json(resp);
        //res.json(null);
    }

    public async eliminarMetodoPago(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query(`DELETE FROM metodo_pago WHERE id = ${id}`);
        res.json(resp);
    }
    public async pagoUsuario(req: Request, res: Response): Promise <void>{
        const respuesta = req.body;
        var cadena_C =`SELECT * FROM metodo_pago WHERE id_usuario = '${respuesta.id_usuario}'`;
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

export const metodo_pagoController = new Metodo_pagoController();