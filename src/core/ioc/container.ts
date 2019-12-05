import Registry from "./registry";

export default class Container {
    private static _instances:Map<string, any> = new Map<string, any>();

    public static resolve<T>(ctor: { new(...args: any[]): T }) {
        return this.resolveByName(ctor.name) as T;
    }

    private static resolveByName(name:string): any{
        if(!this._instances.has(name)) {
            var constructor = Registry.getEntry(name);

            this.createInstance(constructor.typeConstructor, constructor.argumentTypes);
        }

        return this._instances.get(name);
    }

    private static createInstance(ctor: { new(...args: any[]): any }, argumentTypes: string[]){
        var args:any[] = [];

        for(var argType of argumentTypes){
            args.push(this.resolveByName(argType));
        }

        var instance = new ctor(...args);

        this._instances.set(ctor.name, instance);
    }
}