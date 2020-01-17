import HierarchyPath from "@src/core/hierarchy-path";

export default class HierarchyPathMap {

    public entries: Array<[HierarchyPath, HierarchyPath]>;

    constructor(entries: Array<[HierarchyPath, HierarchyPath]> = null){
        if(entries === null) {
            entries = new Array<[HierarchyPath, HierarchyPath]>();
        }

        this.entries = entries;
    }

    public findLeft(right:HierarchyPath): HierarchyPath {
        for(var index = 0; index < this.entries.length; index++){
            var entry = this.entries[index];

            if(entry[1].isEqual(right)){
                return entry[0];
            }
        }

        if(right.isRoot()){
            return null;
        }
        else {
            var result = this.findLeft(right.getParent())

            if(result != null){
                result.getChild(right.end);
            }

            return result;
        }
    }

    public findRight(left:HierarchyPath) : HierarchyPath {
        for(var index = 0; index < this.entries.length; index++){
            var entry = this.entries[index];

            if(entry[0].isEqual(left)){
                return entry[1];
            }
        }

        if(left.isRoot){
            return null;
        }
        else {
            var result = this.findRight(left.getParent())

            if(result != null){
                result.getChild(left.end);
            }

            return result;
        }
    }

    public addEntry(left: HierarchyPath, right: HierarchyPath) {
        this.entries.push([left, right]);
    }

    public toString():string{
        var result = "";
        for(var index = 0; index < this.entries.length; index++) {
            var entry = this.entries[index];
            result += `${entry[0].toString()}\t:\t${entry[1].toString()}\n`;
        }

        return result;        
    }
}