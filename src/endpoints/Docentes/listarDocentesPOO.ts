import { Request, Response } from "express";
import knex from "knex";
import { connection } from "../../data/connection";

export default async function listarDocentePOO(req:Request, res:Response) {
    try{

        let resultado = await connection.raw( 
            `SELECT d.nome, d.email, d.data_nasc, d.turma_id, e.especialidade 
            from Docente AS d inner join Docente_Especialidade de 
            ON de.docente_id = d.id inner join Especialidade e on e.id = de.especialidade_id WHERE e.especialidade="POO"`
        )
        
        let tamanhoResultado = resultado[0].length 

        if(tamanhoResultado < 1){
            return res.status(422).send("No momento não temos nenhum docente com essa especialidade.")
        }

        res.status(200).send(resultado[0])
    }catch(error:any){
        console.log(error.message)
    }
}