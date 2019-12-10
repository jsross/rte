import RteNode from './rte-node';
import HierarchyPath from '@src/core/hierarchy-path';

export default abstract class LeafNode extends RteNode {
    public hasChildren():boolean{
        return false;
    }
}