import ContentSelection from "../content-selection";

export default interface KeyPipe {
    process(payload:KeyPipePayload): KeyPipePayload
}

export interface KeyPipePayload {
    key:string;
    selection: ContentSelection;    
}