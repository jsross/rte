import ParentNode from '../abstract/parent-node';
import RteNode from '../abstract/rte-node';

export default class ListNode extends ParentNode<ParentNode<RteNode>> {
    constructor(children: ParentNode<RteNode>[] = []){
        super(children);
    }
}