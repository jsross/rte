import ParentNode from '../abstract/parent-node';
import Leaf from '../abstract/leaf-node';

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