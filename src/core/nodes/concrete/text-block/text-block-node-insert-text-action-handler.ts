import Action from '@src/core/document-management/actions/action';
import ActionHandler from '@src/core/document-management/actions/action-handler';
import TextBlockNode from './text-block-node';
import InsertTextAction from '@src/core/document-management/actions/insert-text-action';
import DeleteAction from '@src/core/document-management/actions/delete-action';
import { TextNode } from '@src/export';

export default class TextBlockNodeInsertTextActionHandler extends ActionHandler<InsertTextAction, TextBlockNode> {
    
    do(action: InsertTextAction, node: TextBlockNode): Action {
        var startIndex = action.startPath.head;

        if(node.children[startIndex] !== undefined){
            //TODO: hand off to action handler of child node?

            return null;
        }
        else {
            var textNode = new TextNode(action.value);
            node.insertChildAtIndex(textNode, startIndex);

            return new DeleteAction(action.startPath, null);
        }
    }

}