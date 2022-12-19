import { connection } from "./connection"

const erroMensagem = (error:any) => {console.log(error.message ||  error.sqlMessage);

}
const createTables = () => connection
    .raw(
        `
        CREATE TABLE IF NOT EXISTS Estudante_System (
            id VARCHAR(255) PRIMARY KEY
            name VARCHAR(255) NOT NULL
            email VARCHAR(255) NOT NULL
            data_nasc DATE NOT NULL
            turma_id VARCHAR(255) FOREIGN KEY NOT NULL
        );

        CREATE TABLE IF NOT EXISTS Estudante_hobby(
            id VARCHAR(255) PRIMARY KEY
            estudante_id VARCHAR(255) FOREIGN KEY NOT NULL
            hobby_id VARCHAR(255) FOREIGN KEY NOT NULL
        );

        CREATE TABLE IF NOT EXISTS Hobby(
            id VARCHAR(255) PRIMARY KEY
            nome VARCHAR(255) NOT NULL UNIQUE
        );

        CREATE TABLE IF NOT EXISTS Turma(
            id VARCHAR(255) PRIMARY KEY
            nome VARCHAR(255)
            modulo: VARCHAR(255) DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS Docente_System (
            id VARCHAR(255) PRIMARY KEY
            name VARCHAR(255) NOT NULL
            email VARCHAR(255) NOT NULL
            data_nasc DATE NOT NULL
            turma_id VARCHAR(255) FOREIGN KEY NOT NULL
        );
        
        CREATE TABLE IF NOT EXISTS Docente_Especialidade( 
            id VARCHAR(255) PRIMARY KEY
            docente_id VARCHAR(255) FOREIGN KEY NOT NULL
            especialidade_id VARCHAR(255) FOREIGN KEY NOT NULL
        );

        CREATE TABLE IF NOT EXISTS Especialidade( 
            id VARCHAR(255) PRIMARY KEY
            nome VARCHAR(255) NOT NULL UNIQUE
        );
        `
    ).then(() => {console.log("Tabela criada com sucesso!")})
    .catch(erroMensagem)
    
    createTables()