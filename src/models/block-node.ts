import ParentNode from './parent-node';
import RteNode from './rte-node';
import Leaf from './leaf-node';

export default class BlockNode extends ParentNode<Leaf> {
    private _styles:string[];

    get styles(): string[] {
        return this._styles;
    }

    constructor(children: Leaf[] = [], styles:string[] = null){
        super(children);

        this._styles = styles;
    }
}