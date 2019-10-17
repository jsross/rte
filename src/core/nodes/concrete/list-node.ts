import ParentNode from '../abstract/parent-node';
import ListItemNode from './list-item-node';
import HierarchyPath from '../../hierarchy-path';

export default class ListNode extends ParentNode<ListItemNode> {
    constructor(children: ListItemNode[] = []){
        super(children);
    }
}