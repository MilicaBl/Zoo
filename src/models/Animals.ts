export class Animals{
    constructor(
        public id:number, 
        public name:string, 
        public description:string, 
        public imageUrl:string, 
        public isFed:boolean, 
        public lastFed:Date,
        public yearOfBirth:number,
        public medicine:string,
        public longDescription:string
        ){}
}