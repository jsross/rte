import { NamedKeyAttributeValues } from "@src/core/named-key-attribute-values";
import IDocumentTreeNodeKeyListener from "@src/core/document-management/document-tree-node-key-listener";
import TextBlockNode from "./text-block-node";
import HierarchyPath from "@src/core/hierarchy-path";
import Action from "@src/core/document-management/actions/action";
import DeleteAction from "@src/core/document-management/actions/delete-action";
import InsertTextAction from "@src/core/document-management/actions/insert-text-action";
import GroupAction from "@src/core/document-management/actions/group-action";
import SelectAction from "@src/core/document-management/actions/select-action";

export default class TextBlockNodeCharacterKeyListener implements IDocumentTreeNodeKeyListener<TextBlockNode> {
    private readonly _NAMED_KEY_WHITE_LIST:Array<string> = [NamedKeyAttributeValues.WHITESPACE_KEYS.SPACE];

    handleKeyEvent(key: string, modifiers: string[], root:HierarchyPath, start: HierarchyPath, end: HierarchyPath): Action {

        modifiers = modifiers.filter(obj => obj != NamedKeyAttributeValues.MODIFIER_KEYS.SHIFT);

        if(modifiers.length > 0) {
            return null;
        }
    
        if(NamedKeyAttributeValues.Helper.isNamedKeyAttributeValue(key) && !this._NAMED_KEY_WHITE_LIST.includes(key)) {
            return null;
        }

        var actions = new Array<Action>();
        
        if(end != null) {
            actions.push(new DeleteAction(root, start,end));
        }

        actions.push(new InsertTextAction(root, start, key));
        actions.push(new SelectAction(root, start.offset(1),null));

        return new GroupAction(root, actions);
    }

}