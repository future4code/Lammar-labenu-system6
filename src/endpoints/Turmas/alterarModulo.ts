import { Request, Response } from "express";
import { connection } from "../../data/connection";

export default async function alterarModulo(req:Request, res:Response) {
    const id = req.params.id
    const modulo = req.body.modulo
    
    try{

        if(!id){
            res.status(422).send("Id da turma não encontrada")
        }else if(!modulo){
            res.status(422).send("O novo módulo não foi informado, atualização não realizada.")
        }

        let procurandoTurma = await connection.raw( 
            `SELECT Nome FROM Turma where id=${id}`
        )
        
        let tamanhoTurmaEncontrada = procurandoTurma[0].length      

        if(tamanhoTurmaEncontrada < 1){
            return res.status(422).send("Turma não encontrada")
        }

        await connection.raw(
            `UPDATE Turma SET modulo=${modulo} WHERE id=${id}`
        )
        
        res.status(201).send("Módulo alterado com sucesso!")
    }catch(error:any){
        console.log(error.message)
    }
}