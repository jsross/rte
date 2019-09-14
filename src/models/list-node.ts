import ParentNode from './parent-node';
import RteNode from './rte-node';

export default class ListNode extends ParentNode<ParentNode<RteNode>> {
    constructor(children: ParentNode<RteNode>[] = []){
        super(children);
    }
}