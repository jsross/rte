import KeyPipe, { KeyPipePayload } from "./key-pipe";
import { NamedKeyAttributeValues } from "@src/core/named-key-attribute-values";
import InsertTextOperation from "../document-management/operations/insert-text-operation";

export default class CharacterKeyListener implements KeyPipe{
    private readonly _NAMED_KEY_WHITE_LIST:Array<string> = [NamedKeyAttributeValues.WHITESPACE_KEYS.SPACE]; 

    process(payload: KeyPipePayload): KeyPipePayload {
        if(NamedKeyAttributeValues.Helper.isNamedKeyAttributeValue(payload.key) && !this._NAMED_KEY_WHITE_LIST.includes(payload.key)) {
            return payload;
        }
      
        if(!payload.end) {
            var operation = new InsertTextOperation(payload.key, payload.start, payload.end);

            payload.operations.push(operation);
        }

        return payload;
    }

}