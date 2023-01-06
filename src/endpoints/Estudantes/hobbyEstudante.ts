import { Request, Response } from "express";
import { request } from "http";
import { connection } from "../../data/connection";

export default async function hobbyEstudante(
    req: Request,
    res: Response
){
    try{
        // CRIAR UM HOOBY
        const hobbies = req.body.hobbies
        const estudante_id = req.body.estudante_id

        if(!hobbies){
            res.status(422).send("Inserir pelo menos 1 hobby")
        }else if(!estudante_id){
            res.status(411).send("Inserir o id do estudante")
        }

        let resultadoTurma = await connection.raw( 
            `SELECT Nome FROM Estudante where id=${estudante_id}`
        )
        
        let tamanhoResultado = resultadoTurma[0].length      

        if(tamanhoResultado < 1){
            return res.status(422).send("Estudante não encontrado")
        }


        for(let hobby of hobbies) {
            const procurarHobby = await connection.raw(
                `SELECT id FROM Hobby WHERE Hobby = "${hobby.Hobby}"`
            )
            if(procurarHobby[0].length < 1) {
                const id = Math.random()
                await connection.insert(
                    [{
                        id,
                        Hobby: hobby.Hobby
                    }]
                ).into("Hobby")

                await connection.insert(
                    [{
                        estudante_id,
                        hobby_id: id,
                        id: Math.random(),
                    }]
                ).into("Estudante_hobby")
            } else {
                await connection.insert(
                    [{
                        estudante_id,
                        hobby_id: procurarHobby[0][0].id,
                        id: Math.random(),
                    }]
                ).into("Estudante_hobby")
            }
        }

        res.status(201).send("Hobby inserido com sucesso!")
        console.log("Hobby inserido com sucesso!")
    }catch(error:any){
        console.log(error)
    }
}