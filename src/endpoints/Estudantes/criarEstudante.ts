import { Request, Response } from "express";
import { Estudante } from "../../class/Estudante";
import { connection } from "../../data/connection";

export default async function criarEstudante(
    req: Request,
    res: Response
){
    try{
        const {nome, email, data_nasc} = req.body
        const turma = req.body.turma_id
        const id = Math.random()

        if(!nome){
            return res.status(422).send("Insira o nome do estudante.")
        }else if(!email){
            return res.status(422).send("Insira o email do estudante.")
        }else if(!data_nasc){
            return res.status(422).send("Insira a data de nascimento do estudante no formato AAAA-MM-DD")
        }else if (!turma){
            return res.status(422).send("Insira o id da turma")
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
                id,
                nome: nome,
                email: email,
                data_nasc: data_nasc,
                turma_id: turma
            }]
        ).into("Estudante")

        res.status(201).send(`Estudante criado com sucesso! Próxima etapa: Inserir suas especialidades, para isso salve seu id: ${id}`)
    }catch(error:any){
        console.log(error)
    }
}