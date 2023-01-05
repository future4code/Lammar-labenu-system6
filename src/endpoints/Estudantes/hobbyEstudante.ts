import { Request, Response } from "express";
import { connection } from "../../data/connection";

export default async function hobbyEstudante(
    req: Request,
    res: Response
){
    try{
        const hobby_id = req.body.hobby_id
        const estudante_id = req.body.estudante_id

        if(!hobby_id ){
            throw new Error ("Insira o id do hobby")
        }else if(!estudante_id){
            throw new Error ("Insira o id do estudante")
        }

        let resultadoTurma = await connection.raw( 
            `SELECT Nome FROM Estudante where id=${estudante_id}`
        )

        
        let tamanhoResultado = resultadoTurma[0].length      

        if(tamanhoResultado < 1){
            return res.status(422).send("Estudante não encontrado")
        }

        await connection.insert(
            [{
                id: Math.random(),
                hobby_id,
                estudante_id
            }]
        ).into("Estudante_hobby")

        res.status(201).send("Hobby inserido com sucesso!")
        console.log("Hobby inserido com sucesso!")
    }catch(error:any){
        console.log(error)
    }
}