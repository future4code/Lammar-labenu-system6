import { Request, Response } from "express";
import { connection } from "../../data/connection";

export default async function listarDocentes(req:Request, res:Response) {
    try{
        let resultado = await connection.raw( 
            `SELECT * FROM Docente`
        )
        
        let tamanhoResultado = resultado[0].length 

        if(tamanhoResultado < 1){
            return res.status(422).send("No momento não temos nenhum docente cadastrado")
        }    

        res.status(200).send(resultado[0])
    }catch(error:any){
        console.log(error.message)
    }
}