import HierarchyPath from "../../hierarchy-path";
import RteNode from "../../nodes/abstract/rte-node";
import ParentNode from "../../nodes/abstract/parent-node";

export default abstract class RteOperation{

    public start: HierarchyPath;
    public end: HierarchyPath;

    constructor(start:HierarchyPath, end:HierarchyPath = null) {
        this.start = start;
        this.end = end;
    }

    abstract execute(root:RteNode):void;

    protected _resolvePath(root: RteNode, path:HierarchyPath):ResolveResult {
        if(path.isRoot()){
            return {
                node: root,
                remainder: null
            };
        }

        if(root instanceof ParentNode) {
            var parentNode = root as ParentNode<RteNode>;

            var head = path.head;

            var child = parentNode.children[head];

            return this._resolvePath(child, path.tail);
        }

        return {
            node: root,
            remainder: path
        };
    }
}

export interface ResolveResult {
    node: RteNode;
    remainder: HierarchyPath;
} 