import { Request, Response } from "express";
import knex from "knex";
import { connection } from "../../data/connection";

export default async function listarEstudantePorHobby(req:Request, res:Response) {
    try{
        const hobby = req.params.hobby

        let resultado = await connection.raw( 
            `SELECT e.nome, e.email, e.data_nasc, e.turma_id, h.hobby 
            from Estudante AS e inner join Estudante_hobby eh 
            ON eh.estudante_id = e.id inner join Hobby h on h.id = eh.hobby_id WHERE h.hobby=${hobby}`
        )
        
        let tamanhoResultado = resultado[0].length 

        if(tamanhoResultado < 1){
            return res.status(422).send("Não há nenhum estudante cadastrado nesse hobby.")
        }

        res.status(200).send(resultado[0])
    }catch(error:any){
        console.log(error.message)
    }
}