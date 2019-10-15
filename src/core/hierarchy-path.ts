export default class HierarchyPath {

    private readonly _path:Array<number>;
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

    public createChildPath(value:number) {
        var array = this._path.slice(0);

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
        return this._path.length > 0;
    }

    static createRoot() : HierarchyPath{
        return new HierarchyPath([]);
    }

    static getPath(root:Node, toFind:Node) : HierarchyPath {
        if(root === toFind) {
            return this.createRoot();
        }

        if(!toFind.parentNode) {
            throw 'Not found';
        }

        var childNodes = Array.from(toFind.parentNode.childNodes) as Node[];
        var index = childNodes.indexOf(toFind);
    
        var parentPath:HierarchyPath = this.getPath(root, toFind.parentNode);
    
        var result = parentPath.createChildPath(index);
    
        return result;
    }

    public getParent():HierarchyPath {
        if(this.isRoot()) {
            return null;
        }

        var parentArray = this._path.slice(0, this._path.length - 2);
        
        return new HierarchyPath(parentArray);
    }

    public getPreviousSibling():HierarchyPath {
        if(this.isRoot()){
            return null;
        }

        var end = this.end;

        if(this.end === 0){
            return null;
        }

        return this.getParent().createChildPath(end - 1);
    }

    public resolve(node:Node):Node {
        if(this.isRoot()){
          return node;
        }
    
        var child = node.childNodes[this.head];
    
        return this.tail.resolve(child);
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
