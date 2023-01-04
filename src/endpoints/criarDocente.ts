import { Request, Response } from "express";
import { connection } from "../data/connection";

export default async function criarDocente(
    req: Request,
    res: Response
){
    try{
        const {nome, email, data_nasc} = req.body
        const turma = req.body.turma_id

        if(!nome || !email || !data_nasc || !turma){
            throw new Error ("Insira todos os parâmetros necessários: Nome, email, data de nascimento e turma.")
        }

        let resultadoTurma = await connection.raw( 
            `SELECT Nome FROM Turma where id=${turma}`
        )
        
        let tamanhoResultado = resultadoTurma[0].length      

        if(tamanhoResultado < 1){
            return res.status(422).send("Turma não encontrada")
        }

        await connection.insert(
            [{
                id: Math.random(),
                nome: nome,
                email: email,
                data_nasc: data_nasc,
                turma_id: turma
            }]
        ).into("Docente")

        res.status(201).send("Docente criado com sucesso!")
        console.log("Docente criada com sucesso!")
    }catch(error:any){
        console.log(error)
    }
}