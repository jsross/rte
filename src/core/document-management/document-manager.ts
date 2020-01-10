import RootNode from "@src/core/nodes/concrete/root-node";
import ContentSelection from "@src/core/content-selection";
import HierarchyPathMap from "./hierachy-path-map";
import RenderEngine from "@src/core/render-engine";
import RteOperation from "./operations/rte-operation";
import DocumentTreeNode from "../nodes/abstract/document-tree-node";
import ParentNode from "../nodes/abstract/parent-node";
import HierarchyPath from "../hierarchy-path";
import InsertTextOperation from "./operations/insert-text-operation";
import DeleteOperation from "./operations/delete-operation";
import SetSelectionOperation from "./operations/set-selection-operation";
import { Observable, Subscription } from 'rxjs'
import KeyEvent from "./key-event";

export default class DocumentManager {

    private _initialized: boolean = false;
    private _document:RootNode;
    private _selection:ContentSelection;
    private _map:HierarchyPathMap;
    private _renderEngine: RenderEngine;
    private _keyObserbable: Observable<KeyEvent>;
    private _keySubscription: Subscription;

    constructor(document: RootNode, renderEngine: RenderEngine, keyObserable: Observable<KeyEvent>){
        this._document = document;
        this._renderEngine = renderEngine;
        this._keyObserbable = keyObserable;
        this._keySubscription = keyObserable.subscribe(this._handleNextKeyEvent.bind(this));
    }

    public destroy(){
        this._keySubscription.unsubscribe();
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

        if(startPath === null) {
            throw new Error('Unable to locate start');
        }

        var endPath:HierarchyPath;

        if(operation.end != null) {
            endPath = this._map.findLeft(operation.end);

            if(endPath === null) {
                throw new Error('Unable to locate end');
            }
        }

        switch(operation.constructor) {
            case InsertTextOperation: 
                var insertTextOperation = operation as InsertTextOperation;

                var result = this._renderEngine.render(this._document);

                this._map = result.map;
        
                return result.root as DocumentFragment;
            break;
            case DeleteOperation:
                var deleteOperation = operation as DeleteOperation;

                var result = this._renderEngine.render(this._document);

                this._map = result.map;
        
                return result.root as DocumentFragment;                
            break;
            case SetSelectionOperation:
                this._selection = new ContentSelection(startPath, endPath);
            break;
        }
    }

    private _handleNextKeyEvent(event:KeyEvent) {
        var startPointer:HierarchyPath = this._map.findLeft(event.start);
        var endPointer:HierarchyPath = event.end != null ? this._map.findLeft(event.end): null;

        console.log(`nextKeyEvent: ${startPointer.toString()}`);
    }


    private _find(root:DocumentTreeNode, path: HierarchyPath) : [DocumentTreeNode, HierarchyPath] {
        if(!root.hasChildren()){
            return [root, path];
        }

        var parentNode = root as ParentNode<DocumentTreeNode>;

        var child = parentNode.children[path.head];

        if(child === undefined){
            throw new Error('Unable to resolve path');
        }

        return this._find(child, path.tail);       
    }


}