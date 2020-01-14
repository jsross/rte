import RootNode from "@src/core/nodes/concrete/root-node";
import ContentSelection from "@src/core/content-selection";
import DocumentTreeNode from "../nodes/abstract/document-tree-node";
import ParentNode from "../nodes/abstract/parent-node";
import HierarchyPath from "../hierarchy-path";
import { Observable, Subscription } from 'rxjs'
import KeyEvent from "./key-event";

export default class DocumentManager {

    private _document:RootNode;
    private _selection:ContentSelection;
    private _keyObserbable: Observable<KeyEvent>;
    private _keySubscription: Subscription;

    constructor(document: RootNode, keyObserable: Observable<KeyEvent>){
        this._document = document;
        this._keyObserbable = keyObserable;
        this._keySubscription = keyObserable.subscribe(this._handleNextKeyEvent.bind(this));
    }

    public destroy(){
        this._keySubscription.unsubscribe();
    }
    
    private _handleNextKeyEvent(event:KeyEvent) {
        var startPath:HierarchyPath = event.start;
        var endPath:HierarchyPath = event.end;
        var node: DocumentTreeNode;

        if(endPath !== null) {
            var commonAncestor = startPath.getLowestCommonAncestor(endPath);

            var result = this._find(this._document, commonAncestor);

            node = result[0];

            console.log(startPath.toString());
            console.log(endPath.toString());
            console.log(commonAncestor.toString());

            startPath = commonAncestor.getRelativePath(startPath);
            endPath = commonAncestor.getRelativePath(endPath);

            console.log(node);
            console.log(startPath.toString());
            console.log(endPath.toString());
        }
    }

    private _find(root:DocumentTreeNode, path: HierarchyPath) : [DocumentTreeNode, HierarchyPath] {
        if(!root.hasChildren() || path.isRoot()){
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