import KeyListener, { KeyListenerResult } from "../content-area/key-listener";
import ContentAreaSelection from "../content-area/content-area-selection";
import { DeleteOperation } from "../../core/operations/delete-operation";

export default class BackspaceListener implements KeyListener{
  
    handleKey(key: string, selection: ContentAreaSelection): KeyListenerResult {
        var result = new KeyListenerResult();

        if(key !== 'Backspace') {
            return result;
        }

        if(selection.FocusPointer) {
            result.preventNext = true;
            result.operations.push(new DeleteOperation(selection.AnchorPointer, selection.FocusPointer));
        }

        return result;
    }

}