export default class HierarchyPath {

    readonly [key:number]:number;
    private _length:number;

    get head(): number{
        return this[0];
    }

    get tail(): HierarchyPath {
        if(this.isRoot()){
            return null;
        }

        var tailArray = Array.prototype.slice(1) as Array<number>;
        
        return new HierarchyPath(tailArray);
    }

    get end(): number {
        return this[this.length - 1];
    }
    
    get length() {
        return this._length;
    }

    constructor(path:number[]) {
        Object.assign(this, path);
        this._length = path.length;        
    }

    public concat(value:HierarchyPath): HierarchyPath {
        var concatArray = this.toArray().concat(value.toArray());

        return new HierarchyPath(concatArray);
    }

    public createChildPath(value:number) {
        var array = this.toArray();
        array.push(value);

        return new HierarchyPath(array);
    }

    public isChildOf(path:HierarchyPath):boolean {
        var parent = this.getParent();

        if(parent === null){
            return false;
        }

        return parent.isEqual(path);
    }

    public isRoot():boolean {
        return this.length > 0;
    }

    public getParent():HierarchyPath {
        if(this.isRoot()) {
            return null;
        }

        var args = [this,0, this.length - 2];

        var parentArray = Array.prototype.slice.call(args) as Array<number>;
        
        return new HierarchyPath(parentArray);
    }

    public isEqual(path:HierarchyPath):boolean {
        if(path.length !== this.length) {
            return false;
        }

        for(let index:number = 0; index < this.length; index++){
            if(this[index] !== path[index]){
                return false;
            }
        }

        return true;
    }

    public toArray():Array<number> {
        var args = [this,0];

        return Array.prototype.slice.call(args);
    }
}
