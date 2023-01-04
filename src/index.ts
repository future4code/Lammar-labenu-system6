import express from "express"
import cors from 'cors'
import { AddressInfo } from "net"
import criarTurma from "./endpoints/Turmas/criarTurma"
import criarEstudante from "./endpoints/Estudantes/criarEstudante"
import criarDocente from "./endpoints/Docentes/criarDocente"
import listarTurmas from "./endpoints/Turmas/listarTurmas"
import listarEstudante from "./endpoints/Estudantes/listarEstudantes"
import listarDocentes from "./endpoints/Docentes/listarDocentes"
import alterarModulo from "./endpoints/Turmas/alterarModulo"

const app = express()

app.use(express.json())
app.use(cors())

// Criar turma:
app.post("/turma", criarTurma)

// Procurar turmas ativas:
app.get("/turma", listarTurmas)

// Alterar módulo de uma determinada turma:
app.put("/turma/:id", alterarModulo)

// Criar estudante:
app.post("/estudante", criarEstudante)

//Procurar estudante
app.get("/estudante/:nome", listarEstudante)

// Criar docente:
app.post("/docente", criarDocente)

//Procurar docente
app.get("/docente", listarDocentes)

const server = app.listen(process.env.PORT || 3003, () => {
    if(server){
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost:${address.port}`);
    }else{
        console.error(`Failure upon starting server.`)
    }
});