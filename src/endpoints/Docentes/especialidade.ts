import { Request, Response } from "express";
import { connection } from "../../data/connection";

export default async function especialidadeDocente(
    req: Request,
    res: Response
){
    try{
        const especialidade_id = req.body.especialidade_id
        const docente_id = req.body.docente_id

        if(!especialidade_id ){
            throw new Error ("Insira o id da especialidade")
        }else if(!docente_id){
            throw new Error ("Insira o id do docente")
        }

        let resultadoTurma = await connection.raw( 
            `SELECT Nome FROM Docente where id=${docente_id}`
        )

        
        let tamanhoResultado = resultadoTurma[0].length      

        if(tamanhoResultado < 1){
            return res.status(422).send("Docente não encontrado")
        }

        await connection.insert(
            [{
                id: Math.random(),
                docente_id,
                especialidade_id
            }]
        ).into("Docente_Especialidade")

        res.status(201).send("Especialidade inserida com sucesso!")
        console.log("Especialidade inserido com sucesso!")
    }catch(error:any){
        console.log(error)
    }
}