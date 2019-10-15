import { DeleteOperation } from "../operations/delete-operation";
import KeyPipe, { KeyPipePayload } from "./key-pipe";

export default class BackspaceListener implements KeyPipe{

    process(payload: KeyPipePayload): KeyPipePayload {
        if(payload.key !== 'Backspace') {
            return payload;
        }

        if(payload.selection.FocusPointer) {
            var operation = new DeleteOperation(payload.selection.AnchorPointer, payload.selection.FocusPointer);

            payload.operations.push(operation);
        }
        else if(payload.selection.AnchorPointer.end > 0) {
            var sibling = payload.selection.AnchorPointer.getPreviousSibling();

            var operation = new DeleteOperation(sibling);

            payload.operations.push(operation);
        }

        return payload;
    }

}