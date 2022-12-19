export class Pessoa{
    protected id:string;
    protected name:string;
    protected email:string;
    protected data_nasc: Date;
    protected turma_id: string;


    constructor(id:string, name:string, email:string, data_nasc:Date, turma_id:string){
        this.id = id;
        this.name = name;
        this.email = email;
        this.data_nasc = data_nasc;
        this.turma_id = turma_id
    }
}