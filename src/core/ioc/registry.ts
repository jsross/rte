export default class Registry {
    
    private static _entries: Map<string, Constructor> = new Map<string, Constructor>();

    public static register<T>(ctor: { new(...args: any[]): T }) {
        var argumentTypes = ((ctor as any).$inject || []) as string[];
        var entry = new Constructor(ctor, argumentTypes);

        this._entries.set(ctor.name, entry);
    }

    public static getEntry(typeName:string):Constructor {
        if(!this._entries.has(typeName)){
            return null;
        }

        return this._entries.get(typeName);
    }
}

export class Constructor {
    public argumentTypes: string[];
    public typeConstructor:  { new(...args: any[]) : any};

    constructor(typeConstructor: { new(...args: any[]) : any}, argumentTypes: string[]){
        this.typeConstructor = typeConstructor;
        this.argumentTypes = argumentTypes;
    }
}