import ParentNode from '@src/core/nodes/abstract/parent-node';
import DocumentTreeNode from '@src/core/nodes/abstract/document-tree-node';

export default class ListItemNode extends ParentNode<DocumentTreeNode> {
    constructor(children: DocumentTreeNode[] = []){
        super(children);
    }

}