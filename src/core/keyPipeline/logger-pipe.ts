import KeyPipe, { KeyPipePayload } from "./key-pipe";

export default class LoggerPipe implements KeyPipe{
    process(payload: KeyPipePayload): KeyPipePayload {
        console.log(`key: ${payload.key} at ${payload.selection.AnchorPointer}`);
        
        return payload;
    }
}