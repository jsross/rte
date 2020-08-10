import ParentNode from '@src/core/nodes/abstract/parent-node';
import TextNode from '@src/core/nodes/concrete/text/text-node';
import HierarchyPath from '@src/core/hierarchy-path';
import Action from '@src/core/document-management/actions/action';
import RenderEngine from '@src/core/render-engine';
import RenderResult from '@src/core/render-result';
import ActionContext from '@src/core/document-management/actions/action-context';
import DeleteNodeAction from '@src/core/document-management/actions/delete-node-action';
import InsertChildAction from '@src/core/document-management/actions/insert-child-action';
import GroupAction from '@src/core/document-management/actions/group-action';
import InsertTextAction from '@src/core/document-management/actions/insert-text-action';
import DocumentTreeNode from '../../abstract/document-tree-node';

export default class TextBlockNode extends ParentNode<TextNode> {
    private _type:string;

    get type(): string {
        return this._type;
    }

    constructor(children: TextNode[] = [], type:string){
        super(children);

        this._type = type;
    }

    public do(action: Action, context:ActionContext): Action {
        switch (action.constructor) {
            case DeleteNodeAction:
                return this._doDelete(action as DeleteNodeAction, context);
            break;
            case InsertChildAction:
                return this._doInsert(action as InsertChildAction, context);
            break;
        }

        return null;
    }
    
    private _doDelete(action: DeleteNodeAction, context:ActionContext): Action {
        var undoActions:Array<Action> = new Array<Action>();

        return null;
    }

    private _doInsert(action: InsertChildAction, context:ActionContext): Action {
        var childIndex = action.index;

        return null;
    }

    public handleKeyEvent(key:string,
                          modifiers: string[],
                          rootPath:HierarchyPath,
                          relativeStartPath: HierarchyPath,
                          relativeEndPath: HierarchyPath): Action {
        console.debug('TextBlockNode.handleKeyEvent');

        return null;
    }

    public render(engine: RenderEngine, context:Map<string,any>): RenderResult {
        var root = document.createElement('div');

        if(this.type){
            root.className = this.type;
        }

        var map = this._renderChildren(root, engine, context);
        
        var result = new RenderResult(root, map);

        return result;
    }
}