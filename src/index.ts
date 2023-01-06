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
import alterarTurmaEstudante from "./endpoints/Estudantes/alterarTurmaEstudante"
import alterarTurmaDocente from "./endpoints/Docentes/alterarTurmaDocente"
import hobbyEstudante from "./endpoints/Estudantes/hobbyEstudante"
import especialidadeDocente from "./endpoints/Docentes/especialidade"

const app = express()

app.use(express.json())
app.use(cors())


// ---------------> TURMA <--------------------

// Criar turma:
app.post("/turma", criarTurma)

// Procurar turmas ativas:
app.get("/turma", listarTurmas)

// Alterar módulo de uma determinada turma:
app.put("/turma/:id", alterarModulo)


// ---------------> ESTUDANTE <--------------------

// Criar estudante:
app.post("/estudante", criarEstudante)

// Inserir o hobby de um determinado estudante:
app.post("/hobby", hobbyEstudante)

//Procurar estudante
app.get("/estudante/:nome", listarEstudante)

// Alterar turma de uma determinado estudante:
app.put("/estudante/:id", alterarTurmaEstudante)


// ---------------> DOCENTE <--------------------
// Criar docente:
app.post("/docente", criarDocente)

//Procurar docente
app.get("/docente", listarDocentes)

// Alterar turma de um determinado docente:
app.put("/docente/:id", alterarTurmaDocente)

// INSERIR ESPECIALIDADE
// Inserir a especialidade de um determinado docente:
app.post("/especialidade", especialidadeDocente)




const server = app.listen(process.env.PORT || 3003, () => {
    if(server){
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost:${address.port}`);
    }else{
        console.error(`Failure upon starting server.`)
    }
});