import { DeleteOperation } from "../operations/delete-operation";
import KeyPipe, { KeyPipePayload } from "./key-pipe";

export default class BackspaceListener implements KeyPipe{

    process(payload: KeyPipePayload): KeyPipePayload {
        if(payload.key !== 'Backspace') {
            return payload;
        }

        if(payload.selection.FocusPointer) {
            var operation = new DeleteOperation(payload.selection.AnchorPointer, payload.selection.FocusPointer)

            payload.operations.push(operation);
        }

        return payload;
    }

}