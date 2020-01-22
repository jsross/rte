import Action from "./action";
import HierarchyPath from "@src/core/hierarchy-path";
import DocumentTreeNode from "@src/core/nodes/abstract/document-tree-node";

export default class InsertNodeAction extends Action {

    public value: DocumentTreeNode;

    constructor(path:HierarchyPath, value: DocumentTreeNode){
        super(path);

        this.value = value;
    }
}