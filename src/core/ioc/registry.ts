import Constructor from "./constructor";

export default class Registry {
    
    private _entries: Map<string, Constructor>;

    constructor(){
        this._entries = new Map<string, Constructor>();
    }

    public register<T>(ctor: { new(...args: any[]): T }) {
        var argumentTypes = ((ctor as any).$inject || []) as string[];
        var entry = new Constructor(ctor, argumentTypes);

        this._entries.set(ctor.name, entry);
    }

    public getEntry(typeName:string):Constructor {
        if(!this._entries.has(typeName)){
            return null;
        }

        return this._entries.get(typeName);
    }
}