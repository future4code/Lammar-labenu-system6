import { Request, Response } from "express";
import { connection } from "../data/connection";

export default async function criarEstudante(
    req: Request,
    res: Response
){
    try{
        const {nome, email, data_nasc, turma_id} = req.body

        if(!nome && !email && !data_nasc && !turma_id){
            return res.status(422).send("Insira todos os parâmetros necessários: Nome, email, data de nascimento e turma.")
        }
        await connection.insert(
            [{
                id: Math.random(),
                nome: nome,
                email: email,
                data_nasc: data_nasc,
                turma_id: turma_id
            }]
        ).into("Estudante")

        res.status(201).send("Estudante criado com sucesso!")
        console.log("Estudante criada com sucesso!")
    }catch(error:any){
        console.log(error)
    }
}