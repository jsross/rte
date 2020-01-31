import HierarchyPath from "./hierarchy-path";

export default class NodePathHelper{
    static getPath(root:Node, toFind:Node) : HierarchyPath {
        if(root === toFind) {
            return HierarchyPath.createRoot();
        }

        if(!toFind.parentNode) {
            throw 'Not found';
        }

        var childNodes = Array.from(toFind.parentNode.childNodes) as Node[];
        var index = childNodes.indexOf(toFind);
    
        var parentPath:HierarchyPath = this.getPath(root, toFind.parentNode);
    
        var result = parentPath.getChild(index);
    
        return result;
    }

    static resolvePath(root:Node, path:HierarchyPath): [Node, HierarchyPath] {
        if(path.isRoot() || !root.hasChildNodes() ){
          return [root, path];
        }
    
        var child = root.childNodes[path.head];
    
        return NodePathHelper.resolvePath(child, path.tail);
    }
}

export interface PathResolution {
    node: Node;
    remainder: HierarchyPath;
}