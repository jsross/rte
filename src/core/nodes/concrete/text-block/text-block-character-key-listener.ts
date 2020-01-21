import { NamedKeyAttributeValues } from "@src/core/named-key-attribute-values";
import IDocumentTreeNodeKeyListener from "@src/core/document-management/document-tree-node-key-listener";
import TextBlockNode from "./text-block-node";
import HierarchyPath from "@src/core/hierarchy-path";
import Action from "@src/core/document-management/actions/action";
import DeleteAction from "@src/core/document-management/actions/delete-action";
import InsertTextAction from "@src/core/document-management/actions/insert-text-action";
import GroupAction from "@src/core/document-management/actions/group-action";


export default class TextNodeCharacterKeyListener implements IDocumentTreeNodeKeyListener<TextBlockNode> {
    private readonly _NAMED_KEY_WHITE_LIST:Array<string> = [NamedKeyAttributeValues.WHITESPACE_KEYS.SPACE];

    handleKeyEvent(node: TextBlockNode, key: string, modifiers: string[], start: HierarchyPath, end: HierarchyPath): Action {

        modifiers = modifiers.filter(obj => obj != NamedKeyAttributeValues.MODIFIER_KEYS.SHIFT);

        if(modifiers.length > 0) {
            return null;
        }
    
        if(NamedKeyAttributeValues.Helper.isNamedKeyAttributeValue(key) && !this._NAMED_KEY_WHITE_LIST.includes(key)) {
            return null;
        }

        var actions = new Array<Action>();
        
        if(end != null) {
            actions.push(new DeleteAction(start,end));
        }

        actions.push(new InsertTextAction(start, key));

        return new GroupAction(start, actions);
    }

}