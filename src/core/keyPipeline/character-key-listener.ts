import KeyPipe, { KeyPipePayload } from "./key-pipe";
import { NamedKeyAttributeValues } from "@src/core/named-key-attribute-values";
import InsertTextOperation from "../document-management/operations/insert-text-operation";
import SetSelectionOperation from "../document-management/operations/set-selection-operation";
import DeleteOperation from "../document-management/operations/delete-operation";

export default class CharacterKeyListener implements KeyPipe{
    private readonly _NAMED_KEY_WHITE_LIST:Array<string> = [NamedKeyAttributeValues.WHITESPACE_KEYS.SPACE]; 

    process(payload: KeyPipePayload): KeyPipePayload {
        if(NamedKeyAttributeValues.Helper.isNamedKeyAttributeValue(payload.key) && !this._NAMED_KEY_WHITE_LIST.includes(payload.key)) {
            return payload;
        }

        if(payload.selection.FocusPointer) {
            payload.operations.push(new DeleteOperation(payload.selection.AnchorPointer, payload.selection.FocusPointer));
        }
      
        payload.operations.push(new InsertTextOperation(payload.key,
                                                        payload.selection.AnchorPointer));

        var postOperationAnchor = payload.selection.AnchorPointer.getSibling(payload.selection.AnchorPointer.end + payload.key.length);

        payload.operations.push(new SetSelectionOperation(postOperationAnchor));

        return payload;
    }

}