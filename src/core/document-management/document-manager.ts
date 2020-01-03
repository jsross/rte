import DocumentFragmentNode from "@src/core/nodes/concrete/document-fragment-node";
import ContentSelection from "@src/core/content-selection";
import HierarchyPathMap from "./hierachy-path-map";
import RenderEngine from "@src/core/render-engine";
import RteOperation from "./operations/rte-operation";
import RteNode from "../nodes/abstract/rte-node";
import ParentNode from "../nodes/abstract/parent-node";
import HierarchyPath from "../hierarchy-path";
import InsertTextOperation from "./operations/insert-text-operation";
import TextNode from "../nodes/concrete/text-node";
import StringHelper from "../string-helper";
import DeleteOperation from "./operations/delete-operation";
import SetSelectionOperation from "./operations/set-selection-operation";

export default class DocumentManager {

    private _initialized: boolean = false;
    private _document:DocumentFragmentNode;
    private _selection:ContentSelection;
    private _map:HierarchyPathMap;
    private _renderEngine: RenderEngine;

    constructor(document: DocumentFragmentNode, renderEngine: RenderEngine){
        this._document = document;
        this._renderEngine = renderEngine;
    }

    public init() : DocumentFragment {
        if(this._initialized === true) {
            throw new Error('DocumentManager already initialized');
        }

        this._initialized = true;

        var result = this._renderEngine.render(this._document);

        this._map = result.map;

        console.log(this._map.toString());

        return result.root as DocumentFragment;
    }
    
    public executeOperations(operations:RteOperation[]) : [DocumentFragment, ContentSelection] {
        var document:DocumentFragment;

        for(var operation of operations) {
            var result = this.executeOperation(operation) as DocumentFragment;
            if(result) {
                document = result;
            }
        }

        var selection: ContentSelection = null;

        if(this._selection){
            var startPath:HierarchyPath = this._map.findRight(this._selection.AnchorPointer);
            var endPath:HierarchyPath;
    
            if(this._selection.FocusPointer != null) {
                endPath = this._map.findRight(this._selection.FocusPointer);
            }
            
            selection = new ContentSelection(startPath, endPath);
        }

        console.log(selection);
        
        return [document, selection];
    }

    public executeOperation(operation:RteOperation) : DocumentFragment {
        var startPath:HierarchyPath = this._map.findLeft(operation.start);
        var endPath:HierarchyPath;

        if(operation.end != null) {
            endPath = this._map.findLeft(operation.end);
        }

        switch(operation.constructor) {
            case InsertTextOperation: 
                var insertTextOperation = operation as InsertTextOperation;

                this._doInsert(insertTextOperation.value, startPath, endPath);

                var result = this._renderEngine.render(this._document);

                this._map = result.map;
        
                return result.root as DocumentFragment;

            break;
            case DeleteOperation:

            break;
            case SetSelectionOperation:
                
                this._selection = new ContentSelection(startPath, endPath);
            break;
        }
    }

    private _doInsert(value:string, start:HierarchyPath, end:HierarchyPath){
        var startResult = this._find(this._document, start);
        var startNode:TextNode = startResult[0] as TextNode;
        var startIndex = startResult[1].head;

        startNode.content = StringHelper.insert(startNode.content, value, startIndex);
    }

    private _find(root:RteNode, path: HierarchyPath) : [RteNode, HierarchyPath] {
        if(!root.hasChildren()){
            return [root, path];
        }

        var parentNode = root as ParentNode<RteNode>;

        var child = parentNode.children[path.head];

        if(child === undefined){
            throw new Error('Unable to resolve path');
        }

        return this._find(child, path.tail);       
    }


}