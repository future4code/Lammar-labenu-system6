import express from "express"
import cors from 'cors'
import { AddressInfo } from "net"
import criarTurma from "./endpoints/Turmas/criarTurma"
import criarEstudante from "./endpoints/Estudantes/criarEstudante"
import criarDocente from "./endpoints/Docentes/criarDocente"

const app = express()

app.use(express.json())
app.use(cors())

// Criar turma:
app.post("/turma", criarTurma)

// Criar estudante:
app.post("/estudante", criarEstudante)

// Criar docente:
app.post("/docente", criarDocente)

const server = app.listen(process.env.PORT || 3003, () => {
    if(server){
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost:${address.port}`);
    }else{
        console.error(`Failure upon starting server.`)
    }
});