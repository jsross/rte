import HierarchyPath from "@src/core/hierarchy-path";
import Action from "@src/core/document-management/actions/action";
import { NamedKeyAttributeValues } from "@src/core/named-key-attribute-values";
import InsertTextAction from "@src/core/document-management/actions/insert-text-action";
import DeleteAction from "@src/core/document-management/actions/delete-action";
import GroupAction from "@src/core/document-management/actions/group-action";
import SelectAction from '@src/core/document-management/actions/select-action'; 
import IKeyEventListener from "./key-event-listener";

export default class CharacterKeyEventListener implements IKeyEventListener {
    private readonly _NAMED_KEY_WHITE_LIST:Array<string> = [NamedKeyAttributeValues.WHITESPACE_KEYS.SPACE];

    isHandleable(key: string, modifiers:string[]): boolean {
        modifiers = modifiers.filter(obj => obj != NamedKeyAttributeValues.MODIFIER_KEYS.SHIFT);

        if(modifiers.length > 0) {
            return false;
        }

        if(this._NAMED_KEY_WHITE_LIST.includes(key)) {
            return true;
        }
        
        return !NamedKeyAttributeValues.Helper.isNamedKeyAttributeValue(key);
    }

    handleKeyEvent(key: string, modifiers: string[], root: HierarchyPath, start: HierarchyPath, end: HierarchyPath): Action {
        var actions = new Array<Action>();
        
        if(end != null) {
            actions.push(new DeleteAction(root, start,end));
        }

        actions.push(new InsertTextAction(root, start, key));
        actions.push(new SelectAction(root, start.offset(1),null));

        return new GroupAction(root, actions);
    }

}