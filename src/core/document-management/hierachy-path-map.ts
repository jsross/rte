import HierarchyPath from "../hierarchy-path";

export default class HierarchyPathMap {

    private _map: Map<string,string>;

    constructor(map: Map<string,string> = null){
        if(map === null) {
            map = new Map<string,string>();
        }

        this._map = map;
    }
    
    public get entries() : Array<[HierarchyPath, HierarchyPath]> {
        var results = new Array<[HierarchyPath, HierarchyPath]>();

        for(var key of this._map.keys()) {
            var leftKey = HierarchyPath.parse(key);
            var rightKey = HierarchyPath.parse(this._map.get(key));

            results.push([leftKey, rightKey]);
        }

        return results;
    }

    public findRight(left:HierarchyPath) : HierarchyPath {
        var pathString = left.toString();

        if(this._map.has(left.toString())){
        var result = HierarchyPath.parse(this._map.get(pathString));
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
        this._map.set(left.toString(), right.toString());
    }
}