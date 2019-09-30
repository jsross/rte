import ContentUpdate from "./content-update";
import NodePointer from "./node-pointer";
import { ContentAreaElement } from "../../export";

export default class RemoveCharacterUpdate implements ContentUpdate {
    
    public undoAction: ContentUpdate;
    
    private _nodePointer: NodePointer;

    constructor(nodePointer: NodePointer){
        this._nodePointer = nodePointer;
    }

    execute(contentArea: ContentAreaElement): void {
        contentArea.removeCharAt(this._nodePointer.HierarchyPath, this._nodePointer.Offset);
    }

    undo(): void {
        throw new Error("Method not implemented.");
    }

    
}