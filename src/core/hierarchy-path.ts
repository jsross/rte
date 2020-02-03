export default class HierarchyPath {

    static createRoot() : HierarchyPath{
        return new HierarchyPath([]);
    }

    static parse(path:string) : HierarchyPath {
        const validate:RegExp = /^(\/\d*)(\/\d+)*$/g;
        const partsRegex = /((?<=\/)\d+)/g;

        if(!validate.test(path)){
            throw new Error('Parse Exception');
        }

        var matches = path.match(partsRegex);
        
        if(!matches) {
            return HierarchyPath.createRoot();
        }

        var parsed:Array<number> = [];

        for(var match of matches) {
            parsed.push(parseInt(match))
        }

        return new HierarchyPath(parsed);
    }

    private readonly _path:ReadonlyArray<number>;
    private _stringValue: string = null;

    get head(): number{
        return this._path[0];
    }

    get tail(): HierarchyPath {
        if(this.isRoot()){
            return null;
        }

        var tailArray = this._path.slice(1) as Array<number>;
        
        return new HierarchyPath(tailArray);
    }

    get end(): number {
        return this._path[this._path.length - 1];
    }
    
    constructor(path:number[]) {
        this._path = path;
    }

    public concat(value:HierarchyPath): HierarchyPath {
        var concatArray = this._path.concat(value._path);

        return new HierarchyPath(concatArray);
    }

    public depth():number {
        return this._path.length;
    }

    public isAncestorOf(path:HierarchyPath): boolean {
        var lca = this.getLowestCommonAncestor(path);
        
        return this.isEqual(lca);
    }
 
    public isChildOf(path:HierarchyPath):boolean {
        var parent = this.getParent();

        if(parent === null){
            return false;
        }

        return parent.isEqual(path);
    }

    public isEqual(toCompare:HierarchyPath):boolean {
        if(toCompare._path.length !== this._path.length) {
            return false;
        }

        for(let index:number = 0; index < this._path.length; index++){
            if(this._path[index] !== toCompare._path[index]){
                return false;
            }
        }

        return true;
    }

    public isRoot():boolean {
        return this.depth() === 0;
    }

    public getChild(value:number): HierarchyPath {
        var array = this._path.slice(0);

        array.push(value);

        return new HierarchyPath(array);
    }

    public offset(value:number): HierarchyPath {
        if(this.isRoot()){
            throw new Error('Cannot offset root');
        }

        return this.getSibling(this.end + value);
    }

    public getLowestCommonAncestor(toCompare:HierarchyPath) : HierarchyPath{
        var array = new Array<number>();

        var length = Math.min(this.depth(), toCompare.depth());

        for(var index = 0; index < length; index++){
            if(this._path[index] !== toCompare._path[index] ) {
                break;
            }

            array.push(this._path[index]);
        }

        return new HierarchyPath(array);
    }

    public getParent():HierarchyPath {
        if(this.isRoot()) {
            return null;
        }

        var parentArray = this._path.slice(0, this._path.length - 1);
        
        return new HierarchyPath(parentArray);
    }

    public getRelativePath(descendant: HierarchyPath): HierarchyPath{
        if(!this.isAncestorOf(descendant)){
            return null;
        }

        var path = descendant._path.slice(this.depth());

        return new HierarchyPath(path);
    }

    public getSibling(value:number):HierarchyPath {
        if(this.isRoot()){
            throw new Error('Root has no siblings');
        }

        var array = this._path.slice(0, -1);

        array.push(value);

        return new HierarchyPath(array);
    }

    public toString():string{
        if(this._stringValue === null) {
            this._stringValue = '/';

            for(let index:number = 0; index < this._path.length; index++) {
                let value = this._path[index];

                if(index > 0) {
                    this._stringValue += '/';
                }

                this._stringValue += value.toString();
            }
        }

        return this._stringValue;
    }
}
