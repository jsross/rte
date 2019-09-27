import ContentUpdate from "./content-update";

export default class RemoveCharacterUpdate implements ContentUpdate {
    
    public undoAction: ContentUpdate;
    
    private _node: Node;
    private _offset: number;

    constructor(node: Node, offset:number){
        this._node = node;
        this._offset = offset;
    }

    execute(content: Node[]): void {
        var range = document.createRange();
        
        var startNode = content[0];
        var endNode = content[content.length - 1];

        range.setStart(startNode, 0);
        range.setEndAfter(endNode);

        if(!range.isPointInRange(this._node, this._offset)) {
            throw 'Content does not contain point';
        }

        range.detach();

        var contents = this._node.textContent;

        this._node.textContent = contents.substring(0, this._offset-1) + contents.substring( this._offset);
        //var deleteRange = document.createRange();

        //deleteRange.setStart(this._node, this._offset);
        //deleteRange.setStart(this._node, this._offset + 1);

        //deleteRange.deleteContents();

        //deleteRange.detach();
    }

    undo(): void {
        throw new Error("Method not implemented.");
    }

    
}