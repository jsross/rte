import DocumentTreeNode from './document-tree-node';

export default abstract class LeafNode extends DocumentTreeNode {
    public hasChildren():boolean{
        return false;
    }
}