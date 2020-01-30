import HierarchyPath from "../hierarchy-path"
import DocumentTreeNode from "../nodes/abstract/document-tree-node";
import ContentSelection from "../content-selection";

export default class DocumentChangeEvent {

    public path:HierarchyPath;
    public node:DocumentTreeNode;
    public selection:ContentSelection;

    constructor(path:HierarchyPath, node:DocumentTreeNode, selection:ContentSelection){
        this.path = path;
        this.node = node;
        this.selection = selection;
    }
}