import DocumentTreeNode from "./document-tree-node";
import HierarchyPath from "@src/core/hierarchy-path";
import Action from "@src/core/document-management/actions/action";
import RenderEngine from "@src/core/render-engine";
import RenderResult from "@src/core/render-result";
import HierarchyPathMap from "@src/core/hierachy-path-map";
import cloneDeep from 'lodash/cloneDeep';
import ActionContext from "@src/core/document-management/actions/action-context";

export default abstract class ParentNode<T extends DocumentTreeNode> implements DocumentTreeNode {
    private _children:Array<T> = [];

    get children(): Array<T> {
        return this._children;
    }

    constructor(children:Array<T> = null){
        if(children){
            this._children = children;
        }
    }

    public appendChild(child:T) {
        this._children.push(child);
    }

    abstract do(action: Action, context:ActionContext): Action;

    public hasChildren():boolean{
        return this._children.length > 0;
    }

    public insertChildAtIndex(child:T, index:number){
        this._children.splice(index, 0, child);
    }

    public getChildrenSubset(from: number, to: number):T[] {
        return this._children.slice(from, to + 1);
    }

    abstract handleKeyEvent(key:string,
                            modifiers: string[],
                            rootPath:HierarchyPath,
                            relativeStartPath: HierarchyPath,
                            relativeEndPath: HierarchyPath): Action;

    abstract render(engine: RenderEngine, context:Map<string,any>): RenderResult;

    protected _renderChildren(htmlNode: Node,                              
                              engine:RenderEngine,
                              context:Map<string,any>) : HierarchyPathMap {
        var resultMap = new HierarchyPathMap();

        var sourcePath = context.get('sourcePath') as HierarchyPath;
        var destPath = context.get('destPath') as HierarchyPath;

        if(this.hasChildren()){
            let index = 0;

            for(; index < this.children.length; index++) {
                var child = this.children[index];

                var currentContext = cloneDeep(context);
                currentContext.set('sourcePath', sourcePath.getChild(index));
                currentContext.set('destPath', destPath.getChild(index));

                resultMap.addEntry(sourcePath.getChild(index), destPath.getChild(index));

                var childResult = engine.render(child, currentContext);

                htmlNode.appendChild(childResult.root);

                for(var entry of childResult.map.entries) {
                    resultMap.addEntry(entry[0], entry[1]);
                }
            }

            resultMap.addEntry(sourcePath.getChild(index), destPath.getChild(index));
        }

        return resultMap;
    } 
    
}