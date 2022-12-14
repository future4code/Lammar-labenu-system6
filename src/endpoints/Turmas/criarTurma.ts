import { Request, Response } from "express";
import { connection } from "../../data/connection";

export default async function criarTurma(
    req: Request,
    res: Response
){
    try{
        const {nome} = req.body

        if(!nome ){
            return res.status(422).send("Insira todos os parâmetros necessários: Nome e módulo")
        }
        await connection.insert(
            [{
                id: Math.random(),
                nome: nome,
                modulo: 0,
            }]
        ).into("Turma")

        res.status(201).send("Turma criada com sucesso!")
        console.log("Turma criada com sucesso!")
    }catch(error:any){
        console.log(error)
    }
}