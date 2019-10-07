import ParentNode from '../abstract/parent-node';
import RteNode from '../abstract/rte-node';

export default class DocumentFragmentNode extends ParentNode<RteNode> {
    constructor(children: RteNode[] = []){
        super(children);
    }
}