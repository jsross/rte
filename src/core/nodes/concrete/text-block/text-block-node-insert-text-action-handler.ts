import Action from '@src/core/document-management/actions/action';
import ActionHandler from '@src/core/document-management/actions/action-handler';
import TextBlockNode from './text-block-node';
import InsertTextAction from '@src/core/document-management/actions/insert-text-action';
import DeleteAction from '@src/core/document-management/actions/delete-action';
import { TextNode } from '@src/export';
import HierarchyPath from '@src/core/hierarchy-path';
import ActionContext from '@src/core/document-management/actions/action-context';

export default class TextBlockNodeInsertTextActionHandler extends ActionHandler<InsertTextAction, TextBlockNode> {
    
    do(action: InsertTextAction, node: TextBlockNode, context:ActionContext): Action {
        var childIndex = action.indexPath.head;

        if(node.children[childIndex] !== undefined){
            //TODO: hand off to action handler of child node?
            var childNode = node.children[childIndex];

            var childAction = new InsertTextAction(action.targetPath.getChild(childIndex),
                                                   action.indexPath.tail,
                                                   action.value);

            var childActionHandler = context.findActionHandler(childAction.constructor.name, childNode);

            return childActionHandler.do(childAction, childNode, context);
        }
        else {
            var textNode = new TextNode(action.value);
            node.insertChildAtIndex(textNode, childIndex);

            return new DeleteAction(action.targetPath, new HierarchyPath([childIndex]), new HierarchyPath([childIndex + 1]));
        }
    }
}