import { Request, Response } from "express";
import { connection } from "../../data/connection";

export default async function especialidadeDocente(
    req: Request,
    res: Response
){
    try{
        const especialidades = req.body.especialidades
        const docente_id = req.body.docente_id

        if(!especialidades ){
            throw new Error ("Insira pelo menos 1 especialidade")
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

        for (let esp of especialidades){
            const procurarEspecialidade = await connection.raw(
                `SELECT id from Especialidade WHERE especialidade ="${esp.especialidade}"`
            )
            if(procurarEspecialidade[0].length <1){
                const id = Math.random()
                await connection.insert(
                    [{
                        id,
                        especialidade: esp.especialidade
                    }]
                ).into("Especialidade")

                await connection.insert(
                    [{
                        id: Math.random(),
                        docente_id,
                        especialidade_id:id
                    }]
                ).into("Docente_Especialidade")
            }else{
                await connection.insert(
                    [{
                        id: Math.random(),
                        docente_id,
                        especialidade_id: procurarEspecialidade[0][0].id
                    }]
                ).into("Docente_Especialidade")
            }
        }

        res.status(201).send("Especialidade inserida com sucesso!")
        console.log("Especialidade inserida com sucesso!")
    }catch(error:any){
        console.log(error)
    }
}