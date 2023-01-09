import { Request, Response } from "express";
import knex from "knex";
import { connection } from "../../data/connection";

export default async function listarEstudante(req:Request, res:Response) {
    try{
        const nome = req.params.nome

        let resultado = await connection.raw( 
            `SELECT e.id, e.nome, e.email, e.data_nasc, e.turma_id, h.hobby from Estudante AS e inner join Estudante_hobby eh ON eh.estudante_id = e.id inner join Hobby h on h.id = eh.hobby_id WHERE e.nome=${nome}`
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