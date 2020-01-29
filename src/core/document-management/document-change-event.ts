import HierarchyPath from "../hierarchy-path"
import DocumentTreeNode from "../nodes/abstract/document-tree-node";

export default class DocumentChangeEvent {

    public path:HierarchyPath;
    public node:DocumentTreeNode;

    constructor(path:HierarchyPath, node:DocumentTreeNode){
        this.path = path;
        this.node = node;
    }
}