import RteNode from './rte-node';
import HierarchyPath from '../../hierarchy-path';

export default abstract class LeafNode implements RteNode {

    constructor(){}

    abstract insertText(path: HierarchyPath, value: string): void;
    abstract deleteText(path: HierarchyPath, count: number): void;

    public hasChildren():boolean{
        return false;
    }

}