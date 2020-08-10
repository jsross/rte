import DocumentTreeNode from './document-tree-node';
import HierarchyPath from '@src/core/hierarchy-path';
import Action from '@src/core/document-management/actions/action';
import RenderResult from '@src/core/render-result';
import RenderEngine from '@src/core/render-engine';
import ActionContext from '@src/core/document-management/actions/action-context';

export default abstract class LeafNode implements DocumentTreeNode {
    abstract do(action: Action, context:ActionContext): Action;

    public hasChildren():boolean{
        return false;
    }

    abstract handleKeyEvent(key:string,
        modifiers: string[],
        rootPath:HierarchyPath,
        relativeStartPath: HierarchyPath,
        relativeEndPath: HierarchyPath): Action;

    abstract render(engine: RenderEngine, context:Map<string,any>): RenderResult;
}