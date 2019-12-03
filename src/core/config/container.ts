export default class Container {
    public static get<T>(): T{
        Container.prototype
        return null;
    }

    public static register<T extends Function>(constructor:Function){
        var argumentTypes = constructor.prototype.class.$inject as string[];

    }
}