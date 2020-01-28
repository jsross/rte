import RootNode from "@src/core/nodes/concrete/root-node";
import ContentSelection from "@src/core/content-selection";
import DocumentTreeNode from "../nodes/abstract/document-tree-node";
import ParentNode from "../nodes/abstract/parent-node";
import HierarchyPath from "../hierarchy-path";
import { Observable, Subscription } from 'rxjs'
import KeyEvent from "./key-event";
import RteConfig from "../config/rte-config";
import HierarchyPathMap from "../hierachy-path-map";
import Action from "./actions/action";
import ActionHandler from "./actions/action-handler";

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
    
    private _handleNextKeyEvent(event:KeyEvent):void {
        var rootPath:HierarchyPath;
        var relativeStartPath:HierarchyPath;
        var relativeEndPath:HierarchyPath;
        var node: DocumentTreeNode;

        try {

            if(event.end !== null) {
                rootPath = event.start.getLowestCommonAncestor(event.end);

                var result = this._find(this._document, rootPath);

                node = result[0];

                var remained = result[1];

                relativeStartPath = rootPath.getRelativePath(remained.concat(event.start));
                relativeEndPath = rootPath.getRelativePath(remained.concat(event.end));
            }
            else {
                var result = this._find(this._document, event.start);
                node = result[0];
                rootPath = event.start;
                relativeStartPath = result[1];
            }

            var keyListener = RteConfig.getRegisteredNodeKeyListener(node.constructor.name);

            var action = keyListener.handleKeyEvent(event.key, event.modifiers, rootPath, relativeStartPath, relativeEndPath);
            if(action !== null){
                this._processAction(action);
            }
        }
        catch(e){
            console.error(e);
        }
    }

    private _processAction(action:Action):void{
        console.log(action);

        var target = this._find(this._document, action.targetPath)[0];

        var actionType = action.constructor.name;

        var actionHandler = this._findActionHandler(actionType, target);

        if(actionHandler != null){
            var undoAction = actionHandler.do(action, target);

            console.log(undoAction);
        }
    }

    private _findActionHandler(actionType:string, node: DocumentTreeNode) : ActionHandler<any,any> {
        var nodeType = node.constructor.name;

        var actionHandler = RteConfig.getRegisteredActionHandler(nodeType, actionType);

        if(actionHandler != null) {
            return actionHandler;
        }

        if(nodeType === 'DocumentTreeNode')
            return null;
            
        var parentObject = Object.getPrototypeOf(node) as DocumentTreeNode;

        return this._findActionHandler(actionType, parentObject);        
    }

}