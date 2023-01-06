import { Request, Response } from "express";
import { connection } from "../../data/connection";

export default async function criarDocente(
    req: Request,
    res: Response
){
    try{
        const {nome, email, data_nasc} = req.body
        const turma = req.body.turma_id
        const id = Math.random()

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
                id,
                nome: nome,
                email: email,
                data_nasc: data_nasc,
                turma_id: turma
            }]
        ).into("Docente")

        res.status(201).send(`Docente criado com sucesso! Próxima etapa: Inserir suas especialidades, para isso salve seu id: ${id}`)
    }catch(error:any){
        console.log(error)
    }
}