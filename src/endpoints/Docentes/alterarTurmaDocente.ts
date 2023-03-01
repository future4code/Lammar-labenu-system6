import { Request, Response } from "express";
import { connection } from "../../data/connection";

export default async function alterarTurmaDocente(req:Request, res:Response) {
    const id = req.params.id
    const turma_id = req.body.turma_id
    
    try{

        if(!id){
            res.status(422).send("Id da turma não encontrada")
        }else if(!turma_id){
            res.status(422).send("O id da nova turma não foi informado, atualização não realizada.")
        }

        let procurandoDocente = await connection.raw( 
            `SELECT Nome FROM Docente where id=${id}`
        )
        
        let tamanhoDocenteEncontrado = procurandoDocente[0].length      

        if(tamanhoDocenteEncontrado < 1){
            return res.status(422).send("Docente não encontrado")
        }

        
        let procurandoTurma = await connection.raw( 
            `SELECT Nome FROM Turma where id=${turma_id}`
        )
        
        let tamanhoTurmaEncontrada = procurandoTurma[0].length      

        if(tamanhoTurmaEncontrada < 1){
            return res.status(422).send("Turma não encontrada")
        }

        await connection.raw(
            `UPDATE Docente SET turma_id=${turma_id} where id=${id}`
        )
        
        res.status(201).send("Docente cadastrado na nova turma!")
    }catch(error:any){
        console.log(error.message)
    }
}