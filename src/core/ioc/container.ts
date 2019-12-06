import Registry from "./registry";

export default class Container {
    private _instances:Map<string, any> = new Map<string, any>();
    private _registry: Registry;

    constructor(registry: Registry) {
        this._registry = registry;
        this._instances =  new Map<string, any>();
    }

    public resolve<T>(ctor: { new(...args: any[]): T }) {
        return this.resolveByName(ctor.name) as T;
    }

    private resolveByName(name:string): any{
        if(!this._instances.has(name)) {
            var constructor = this._registry.getEntry(name);

            this.createInstance(constructor.constructorFunction, constructor.argumentTypes);
        }

        return this._instances.get(name);
    }

    private createInstance(ctor: { new(...args: any[]): any }, argumentTypes: string[]){
        var args:any[] = [];

        for(var argType of argumentTypes){
            args.push(this.resolveByName(argType));
        }

        var instance = new ctor(...args);

        this._instances.set(ctor.name, instance);
    }
}