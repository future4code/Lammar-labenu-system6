import { Request, Response } from "express";
import { connection } from "../../data/connection";

export default async function listarEstudante(req:Request, res:Response) {
    try{
        const nome = req.params.nome

        let resultado = await connection.raw( 
            `SELECT * FROM Estudante WHERE nome=${nome}`
        )
        
        let tamanhoResultado = resultado[0].length 

        if(tamanhoResultado < 1){
            return res.status(422).send("Estudante não encontrado, favor digitar o nome completo")
        }    

        res.status(200).send(resultado[0])
    }catch(error:any){
        console.log(error.message)
    }
}