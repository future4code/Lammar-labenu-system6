export class Turma{
    protected id:string;
    protected nome:string;
    protected docentes:string;
    protected estudantes: Date;
    protected modulo: number;


    constructor(id:string, nome:string, docentes:string, estudantes:Date, modulo:number){
        this.id = id;
        this.nome = nome;
        this.docentes = docentes;
        this.estudantes = estudantes;
        this.modulo = modulo
    }
}