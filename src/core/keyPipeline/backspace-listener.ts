import { DeleteTextOperation } from "../operations/delete-text-operation";
import KeyPipe, { KeyPipePayload } from "./key-pipe";

export default class BackspaceListener implements KeyPipe{

    process(payload: KeyPipePayload): KeyPipePayload {
        if(payload.key !== 'Backspace') {
            return payload;
        }
      
        if(!payload.end && payload.start.end > 0) {
            var sibling = payload.start.getPreviousSibling();

            var operation = new DeleteTextOperation(sibling, 1);

            payload.operations.push(operation);
        }

        return payload;
    }

}