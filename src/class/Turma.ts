export class Turma{
    protected id:string;
    protected name:string;
    protected docentes:string;
    protected estudantes: Date;
    protected modulo: number;


    constructor(id:string, name:string, docentes:string, estudantes:Date, modulo:number){
        this.id = id;
        this.name = name;
        this.docentes = docentes;
        this.estudantes = estudantes;
        this.modulo = modulo
    }
}