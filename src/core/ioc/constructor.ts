export default class Constructor {
    public argumentTypes: string[];
    public constructorFunction:  { new(...args: any[]) : any};

    constructor(constructorFunction: { new(...args: any[]) : any}, argumentTypes: string[]){
        this.constructorFunction = constructorFunction;
        this.argumentTypes = argumentTypes;
    }
}