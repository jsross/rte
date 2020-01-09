import LeafNode from '@src/core/nodes/abstract/leaf-node';

export default class TextNode extends LeafNode {
    public content: string;
    public styles: string[];

    constructor(content:string, styles:string[] = null){
        super();

        this.content = content;
        this.styles = styles;
    }

}