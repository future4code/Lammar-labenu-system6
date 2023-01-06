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

        for(let hobby of hobbies) {
            const procurarHobby = await connection.raw(
                `SELECT id FROM Hobby WHERE nome = "${hobby.nome}"`
            )
            if(procurarHobby[0].length < 1) {
                const id = Math.random()
                await connection.insert(
                    [{
                        id,
                        nome: hobby.nome
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