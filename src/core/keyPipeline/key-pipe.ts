import HierarchyPath from "../hierarchy-path";
import ContentSelection from "../content-selection";

export default interface KeyPipe {
    process(payload:KeyPipePayload): KeyPipePayload
}

export class KeyPipePayload {
    public selection: ContentSelection;
    public key:string;

    constructor(key:string, selection: ContentSelection){
        this.selection = selection;
        this.key = key;
    }
}