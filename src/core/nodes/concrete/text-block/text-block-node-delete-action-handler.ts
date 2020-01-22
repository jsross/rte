import Action from '@src/core/document-management/actions/action';
import ActionHandler from '@src/core/document-management/actions/action-handler';
import TextBlockNode from './text-block-node';
import InsertTextAction from '@src/core/document-management/actions/insert-text-action';
import DeleteAction from '@src/core/document-management/actions/delete-action';
import { TextNode } from '@src/export';

export default class TextBlockNodeDeleteTextActionHandler extends ActionHandler<DeleteAction, TextBlockNode> {
    
    do(action: DeleteAction, node: TextBlockNode): Action {
        var startIndex = action.startPath.head;

        var children = node.getChildren(action.startPath.head, action.endPath.head);

        if(children.length == 1){
            if(action.startPath.depth() > 1) {
                
            }
        }

        if(node.children[startIndex] !== undefined){
            //TODO: hand off to action handler of child node?

            return null;
        }
        else {
            var textNode = new TextNode(action);
            node.insertChildAtIndex(textNode, startIndex);

            return new DeleteAction(action.startPath, null);
        }
    }

}