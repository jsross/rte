import KeyPipe, { KeyPipePayload } from "./key-pipe";
import DeleteTextOperation from "@src/core/document-management/operations/delete-text-operation";
import HierarchyPathMap from "../document-management/hierachy-path-map";
import HierarchyPath from "../hierarchy-path";

export default class BackspaceListener implements KeyPipe{

    process(payload: KeyPipePayload): KeyPipePayload {
        if(payload.key !== 'Backspace') {
            return payload;
        }

        var start:HierarchyPath = null;
        var end:HierarchyPath = null;

        if(!payload.end) {
            start = payload.start.getPreviousSibling();
            end = payload.start;
        }
        else {
            start = payload.start;
            end = payload.end;
        }
         
        var operation = new DeleteTextOperation(start, end);

        payload.operations.push(operation);

        return payload;
    }

}