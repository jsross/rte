import ParentNode from '@src/core/nodes/abstract/parent-node';
import DocumentTreeNode from '@src/core/nodes/abstract/document-tree-node';
import HierarchyPath from '@src/core/hierarchy-path';
import Action from '@src/core/document-management/actions/action';
import RenderResult from '@src/core/render-result';
import RenderEngine from '@src/core/render-engine';
import ActionContext from '@src/core/document-management/actions/action-context';

export default class ListItemNode extends ParentNode<DocumentTreeNode> {
    constructor(children: DocumentTreeNode[] = []){
        super(children);
    }
    
    public do(action: Action, context:ActionContext): Action {
        return null;
    }

    public handleKeyEvent(key:string,
                          modifiers: string[],
                          rootPath:HierarchyPath,
                          relativeStartPath: HierarchyPath,
                          relativeEndPath: HierarchyPath): Action {
        console.debug('ListItemNode.handleKeyEvent');

        return null;
    }

    public render(engine: RenderEngine, context:Map<string,any>): RenderResult {
        var root = document.createElement('li');

        var map = this._renderChildren(root, engine, context);
        
        var result = new RenderResult(root, map);

        return result;
    }

}