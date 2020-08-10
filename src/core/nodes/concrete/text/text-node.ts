import LeafNode from '@src/core/nodes/abstract/leaf-node';
import HierarchyPath from '@src/core/hierarchy-path';
import Action from '@src/core/document-management/actions/action';
import HierarchyPathMap from '@src/core/hierachy-path-map';
import RenderEngine from '@src/core/render-engine';
import RenderResult from '@src/core/render-result';
import DeleteTextAction from '@src/core/document-management/actions/delete-text-action';
import ActionContext from '@src/core/document-management/actions/action-context';
import InsertTextAction from '@src/core/document-management/actions/insert-text-action';
import GroupAction from '@src/core/document-management/actions/group-action';
import SelectAction from '@src/core/document-management/actions/select-action';

export default class TextNode extends LeafNode {
    public content: string;
    public styles: string[];

    constructor(content:string, styles:string[] = null){
        super();

        this.content = content;
        this.styles = styles;
    }

    public do(action: Action, context:ActionContext): Action {
        switch (action.constructor) {
            case DeleteTextAction:
                return this._doDelete(action as DeleteTextAction, context);
            break;
            case InsertTextAction:
                return this._doInsert(action as InsertTextAction, context);
            break;
        }

        return null;
    }

    public handleKeyEvent(key:string,
                          modifiers: string[],
                          rootPath:HierarchyPath,
                          relativeStartPath: HierarchyPath,
                          relativeEndPath: HierarchyPath): Action {
        console.debug('TextNode.handleKeyEvent');

        var actions = new Array<Action>();

        if(relativeEndPath) {
            var deleteAction = new DeleteTextAction(rootPath, relativeStartPath.head, relativeEndPath.head);

            actions.push(deleteAction);
        }
        
        var insertTextAction = new InsertTextAction(rootPath, relativeStartPath.head, key);
        var selectAction = new SelectAction(rootPath, relativeStartPath.offset(1), null);

        actions.push(insertTextAction);
        actions.push(selectAction);
        
        var groupAction = new GroupAction(rootPath,actions)

        return groupAction;
    }

    public render(engine: RenderEngine, context:Map<string,any>): RenderResult {
        var map = new HierarchyPathMap();

        var root = document.createElement('span');

        if(this.styles){
            root.className = this.styles.join(' ');
        }

        var sourcePath = context.get('sourcePath') as HierarchyPath;
        var destPath = context.get('destPath') as HierarchyPath;   
        
        var content = this.content.replace(/ /g, '\u205f');

        var currentLine = "";

        var index = 0

        for (; index < content.length; index++) {
            var char = content.charAt(index);

            if(char === '\n'){
                if(currentLine.length > 0) {
                    root.appendChild(document.createTextNode(currentLine));
                    currentLine = "";
                }
                
                root.appendChild(document.createElement('br')); 

                map.addEntry(sourcePath.getChild(index),destPath.getChild(root.childNodes.length - 1));
            }
            else {
                currentLine += char;

                map.addEntry(sourcePath.getChild(index),destPath.getChild(root.childNodes.length).getChild(currentLine.length - 1));
            }
        }

        root.appendChild(document.createTextNode(currentLine));

        map.addEntry(sourcePath.getChild(index),destPath.getChild(root.childNodes.length - 1).getChild(currentLine.length));

        var result = new RenderResult(root, map);

        return result;
    }

    private _doDelete(action: DeleteTextAction, context:ActionContext): Action {
        var content = this.content;

        var startIndex = action.startIndex ? action.startIndex : 0;
        var endIndex = action.endIndex ? action.endIndex : this.content.length;

        var result:string = content.substring(0, startIndex) + content.substring(endIndex);
        var removed:string = content.substring(startIndex, endIndex);

        this.content = result;

        return new InsertTextAction(action.targetPath, startIndex, removed);
    }

    public _doInsert(action: InsertTextAction, context:ActionContext): Action {
        var content = this.content;

        var index = action.index;

        var result = content.substring(0, index) + action.value + content.substring(index);
        this.content = result;

        var deleteEnd = index + action.value.length;

        return new DeleteTextAction(action.targetPath, index, deleteEnd);
    }

}