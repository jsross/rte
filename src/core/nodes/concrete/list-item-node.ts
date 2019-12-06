import ParentNode from '@src/core/nodes/abstract/parent-node';
import RteNode from '@src/core/nodes/abstract/rte-node';

export default class ListItemNode extends ParentNode<RteNode> {
    constructor(children: RteNode[] = []){
        super(children);
    }

}