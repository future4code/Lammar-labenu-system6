import { Pessoa } from "./Pessoa";

export class Docente extends Pessoa{
    especialidades: string[];
    constructor(id:string, nome:string, email:string, data_nasc:Date, turma_id:string, especialidades:string[]){
        super(id, nome, email, data_nasc, turma_id)
        this.especialidades = especialidades
    }
}