import RootNode from "@src/core/nodes/concrete/root-node";
import ContentSelection from "@src/core/content-selection";
import HierarchyPathMap from "./hierachy-path-map";
import RenderEngine from "@src/core/render-engine";
import DocumentTreeNode from "../nodes/abstract/document-tree-node";
import ParentNode from "../nodes/abstract/parent-node";
import HierarchyPath from "../hierarchy-path";
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
    
    private _handleNextKeyEvent(event:KeyEvent) {
        var startPath:HierarchyPath = this._map.findLeft(event.start);
        var endPath:HierarchyPath = event.end != null ? this._map.findLeft(event.end): null;

        console.log(`nextKeyEvent - start: ${startPath.toString()}`);

        if(endPath !== null) {
            var commonAncestor = startPath.getLowestCommonAncestor(endPath);
            console.log(`nextKeyEvent - end: ${endPath.toString()}`);
            console.log(`ancestor: ${commonAncestor.toString()}`);
        }
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