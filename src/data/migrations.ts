import { connection } from "./connection"

const erroMensagem = (error:any) => {console.log(error.message ||  error.sqlMessage);

}
const createTables = async () => connection
    .raw(
        `
        CREATE TABLE IF NOT EXISTS Turma(
            id VARCHAR(255) PRIMARY KEY,
            nome VARCHAR(255),
            modulo VARCHAR(255) DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS Estudante (
            id VARCHAR(255) PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            data_nasc DATE NOT NULL,
            turma_id VARCHAR(255) NOT NULL,
            FOREIGN KEY (turma_id) REFERENCES Turma(id)
        );

        CREATE TABLE IF NOT EXISTS Docente (
            id VARCHAR(255) PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            data_nasc DATE NOT NULL,
            turma_id VARCHAR(255) NOT NULL,
            FOREIGN KEY (turma_id) REFERENCES Turma(id)
        );

        CREATE TABLE IF NOT EXISTS Hobby(
            id VARCHAR(255) PRIMARY KEY,
            Hobby VARCHAR(255) NOT NULL UNIQUE
        ); 

        CREATE TABLE IF NOT EXISTS Estudante_hobby(
            id VARCHAR(255) PRIMARY KEY,
            estudante_id VARCHAR(255) NOT NULL,
            hobby_id VARCHAR(255) NOT NULL,
            FOREIGN KEY (estudante_id) REFERENCES Estudante(id),
            FOREIGN KEY (hobby_id) REFERENCES Hobby(id)
        );
        
        CREATE TABLE IF NOT EXISTS Especialidade( 
            id VARCHAR(255) PRIMARY KEY,
            especialidade VARCHAR(255) NOT NULL UNIQUE
        );
        
        CREATE TABLE IF NOT EXISTS Docente_Especialidade( 
            id VARCHAR(255) PRIMARY KEY,
            docente_id VARCHAR(255) NOT NULL,
            especialidade_id VARCHAR(255) NOT NULL,
            FOREIGN KEY (docente_id) REFERENCES Docente(id),
            FOREIGN KEY (especialidade_id) REFERENCES Especialidade(id)
        );

        `
    ).then(() => {console.log("Tabela criada com sucesso!")})
    .catch(erroMensagem)
    
    createTables()
    