import ParentNode from '@src/core/nodes/abstract/parent-node';
import TextNode from '@src/core/nodes/concrete/text/text-node';

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