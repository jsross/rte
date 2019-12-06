import RteNode from './rte-node';
import HierarchyPath from '@src/core/hierarchy-path';

export default abstract class LeafNode extends RteNode {

    abstract insertText(path: HierarchyPath, value: string): void;
    abstract deleteText(path: HierarchyPath, count: number): void;

    public hasChildren():boolean{
        return false;
    }

}