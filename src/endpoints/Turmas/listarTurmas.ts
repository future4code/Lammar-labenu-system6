import { Request, Response } from "express";
import { connection } from "../../data/connection";

export default async function listarTurmas(req:Request, res:Response) {
    try{
        let resultado = await connection.raw( 
            `SELECT * FROM Turma`
        )
        res.status(200).send(resultado[0])
    }catch(error:any){
        console.log(error.message)
    }
}