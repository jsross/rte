import HierachyPath from "./hierarchy-path";

export default class ContentSelection {

    private readonly _anchorPointer: HierachyPath;
    public readonly _focusPointer: HierachyPath;

    get AnchorPointer():HierachyPath {
        return this._anchorPointer;
    }

    get FocusPointer():HierachyPath {
        return this._focusPointer;
    }
    
    constructor(anchorPointer:HierachyPath, focusPointer:HierachyPath = null) {
        if(!anchorPointer) {
            throw Error('Illegal Argument Exception');
        }

        this._anchorPointer = anchorPointer;
        this._focusPointer = focusPointer;
    }
}