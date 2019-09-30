import NodePointer from "./node-pointer";

export default class ContentAreaSelection {

    private readonly _anchorPointer: NodePointer;
    public readonly _focusPointer: NodePointer;

    get AnchorPointer():NodePointer {
        return this._anchorPointer;
    }

    get FocusPointer():NodePointer {
        return this._focusPointer;
    }
    
    constructor(anchorPointer:NodePointer, focusPointer:NodePointer = null) {
        this._anchorPointer = anchorPointer;
        this._focusPointer = focusPointer;
    }
}