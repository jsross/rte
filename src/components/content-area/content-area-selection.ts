import HierachyPath from "../../core/hierarchy-path";

export default class ContentAreaSelection {

    private readonly _anchorPointer: HierachyPath;
    public readonly _focusPointer: HierachyPath;

    get AnchorPointer():HierachyPath {
        return this._anchorPointer;
    }

    get FocusPointer():HierachyPath {
        return this._focusPointer;
    }
    
    constructor(anchorPointer:HierachyPath, focusPointer:HierachyPath = null) {
        this._anchorPointer = anchorPointer;
        this._focusPointer = focusPointer;
    }
}