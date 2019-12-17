import KeyPipe, { KeyPipePayload } from "./key-pipe";
import DeleteOperation from "@src/core/document-management/operations/delete-operation";
import HierarchyPathMap from "../document-management/hierachy-path-map";
import HierarchyPath from "../hierarchy-path";

export default class BackspaceListener implements KeyPipe{

    process(payload: KeyPipePayload): KeyPipePayload {
        if(payload.key !== 'Backspace') {
            return payload;
        }

        var initialSelection = payload.selection;

        var start:HierarchyPath = null;
        var end:HierarchyPath = null;

        if(!initialSelection.FocusPointer) {
            start = initialSelection.AnchorPointer.getPreviousSibling();
            end = initialSelection.AnchorPointer;
        }
        else {
            start = initialSelection.AnchorPointer;
            end = initialSelection.FocusPointer;
        }
         
        var operation = new DeleteOperation(start, end);

        payload.operations.push(operation);

        return payload;
    }

}