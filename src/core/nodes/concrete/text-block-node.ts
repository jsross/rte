import ParentNode from '../abstract/parent-node';
import Leaf from '../abstract/leaf-node';
import TextNode from './text-node';

export default class TextBlockNode extends ParentNode<TextNode> {
    private _type:string;

    get type(): string {
        return this._type;
    }

    constructor(children: TextNode[] = [], type:string){
        super(children);

        this._type = type;
    }
}