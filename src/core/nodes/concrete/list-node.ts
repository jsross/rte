import ParentNode from '@src/core/nodes/abstract/parent-node';
import ListItemNode from './list-item-node';

export default class ListNode extends ParentNode<ListItemNode> {
    constructor(children: ListItemNode[] = []){
        super(children);
    }
}