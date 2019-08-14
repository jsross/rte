import ParentNode from './parent-node';
import RteNode from './rte-node';

export default class DocumentNode extends ParentNode<RteNode> {
    constructor(children: RteNode[] = []){
        super(children);
    }
}