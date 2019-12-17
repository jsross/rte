import HierarchyPath from "../hierarchy-path";
import RteOperation from "../document-management/operations/rte-operation";
import ContentSelection from "../content-selection";

export default interface KeyPipe {
    process(payload:KeyPipePayload): KeyPipePayload
}

export class KeyPipePayload {
    public selection: ContentSelection;
    public key:string;
    public operations: RteOperation[];    

    constructor(key:string, selection: ContentSelection){
        this.selection = selection;
        this.key = key;
        this.operations = new Array<RteOperation>();
    }
}