import ContentSelection from "../content-selection";
import RteOperation from "../operations/rte-operation";

export default interface KeyPipe {
    process(payload:KeyPipePayload): KeyPipePayload
}

export class KeyPipePayload {
    public key:string;
    public selection: ContentSelection;
    public operations: RteOperation[];

    constructor(key:string, selection:ContentSelection){
        this.key = key;
        this.selection = selection;
        this.operations = new Array<RteOperation>();
    }
}