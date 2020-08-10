import Action from "./action";
import HierarchyPath from "@src/core/hierarchy-path";
import DocumentTreeNode from "@src/core/nodes/abstract/document-tree-node";

export default class InsertNodeAction extends Action {

    public value: DocumentTreeNode;
    public index: number;

    constructor(targetPath:HierarchyPath, index:number, value: DocumentTreeNode){
        super(targetPath);

        this.index = index;
        this.value = value;
    }
}