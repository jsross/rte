import HierarchyPath from "@src/core/hierarchy-path";

export default class HierarchyPathMap {

    private _leftToRightMap: Map<string,string>;
    private _rightToLeftMap: Map<string,string>;

    constructor(leftToRightMap: Map<string,string> = null, rightToLeftMap:Map<string,string> = null){
        if(leftToRightMap === null) {
            leftToRightMap = new Map<string,string>();
        }

        if(rightToLeftMap === null) {
            rightToLeftMap = new Map<string,string>();
        }

        this._leftToRightMap = leftToRightMap;
        this._rightToLeftMap = rightToLeftMap;
    }
    
    public get leftToRightEntries() : Array<[HierarchyPath, HierarchyPath]> {
        var results = new Array<[HierarchyPath, HierarchyPath]>();

        for(var key of this._leftToRightMap.keys()) {
            var leftKey = HierarchyPath.parse(key);
            var rightKey = HierarchyPath.parse(this._leftToRightMap.get(key));

            results.push([leftKey, rightKey]);
        }

        return results;
    }

    public get rightToLeftEntries(): Array<[HierarchyPath, HierarchyPath]> {
        var results = new Array<[HierarchyPath, HierarchyPath]>();

        for(var key of this._rightToLeftMap.keys()) {
            var leftKey = HierarchyPath.parse(key);
            var rightKey = HierarchyPath.parse(this._rightToLeftMap.get(key));

            results.push([leftKey, rightKey]);
        }

        return results;
    }

    public findLeft(right:HierarchyPath): HierarchyPath {
        var pathString = right.toString();

        if(this._rightToLeftMap.has(right.toString())){
            var result = HierarchyPath.parse(this._rightToLeftMap.get(pathString));
            return result;
        }

        if(right.isRoot()) {
            return HierarchyPath.createRoot();
        }

        var mapValue = this.findRight(right.getParent());
        
        var result = mapValue.getSibling(mapValue.end + right.end);

        return result;
    }

    public findRight(left:HierarchyPath) : HierarchyPath {
        var pathString = left.toString();

        if(this._leftToRightMap.has(left.toString())){
        var result = HierarchyPath.parse(this._leftToRightMap.get(pathString));
        return result;
        }

        if(left.isRoot()) {
        return HierarchyPath.createRoot();
        }

        var mapValue = this.findRight(left.getParent());
        
        var result = mapValue.getSibling(mapValue.end + left.end);

        return result;
    }

    public setLeftToRight(left: HierarchyPath, right: HierarchyPath) {
        this._leftToRightMap.set(left.toString(), right.toString());
    }

    public setRightToLeft(right:HierarchyPath, left:HierarchyPath) {
        this._rightToLeftMap.set(right.toString(), left.toString());
    }
}