import RootNode from "@src/core/nodes/concrete/root-node";
import ContentSelection from "@src/core/content-selection";
import DocumentTreeNode from "../nodes/abstract/document-tree-node";
import ParentNode from "../nodes/abstract/parent-node";
import HierarchyPath from "../hierarchy-path";
import { Observable, Subscription, Subject, Observer } from 'rxjs'
import KeyEvent from "./key-event";
import RteConfig from "../config/rte-config";
import Action from "./actions/action";
import ActionHandler from "./actions/action-handler";
import DocumentChangeEvent from "./document-change-event";
import ActionContext from "./actions/action-context";

export default class DocumentManager {

    private _document:RootNode;
    private _selection:ContentSelection;
    private _keySubscription: Subscription;
    private _changeSubject: Subject<DocumentChangeEvent>;

    constructor(document: RootNode, keyObserable: Observable<KeyEvent>){
        this._document = document;
        this._keySubscription = keyObserable.subscribe(this._handleNextKeyEvent.bind(this));
        this._changeSubject = new Subject<DocumentChangeEvent>();
    }

    public destroy(){
        this._keySubscription.unsubscribe();
        this._changeSubject.unsubscribe();
    }

    public onChange(observer: Observer<DocumentChangeEvent>) {
        this._changeSubject.subscribe(observer);
    }

    public setSelection(selection:ContentSelection) {
        this._selection = selection;

        console.log('selection change');
        console.log(this._selection);
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
                rootPath = event.start.getAncestor(result[1].depth());
                relativeStartPath = result[1];
            }

            var keyListener = RteConfig.getKeyEventListener(event.key, event.modifiers);

            if(keyListener === null)
                return;

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
        var target = this._find(this._document, action.targetPath)[0];

        var actionType = action.constructor.name;

        var actionHandler = this._findActionHandler(actionType, target);

        if(actionHandler != null){
            var context = new ActionContext(this._selection);

            var undoAction = actionHandler.do(action, target, context);

            this._selection = context.selection;

            var event = new DocumentChangeEvent(action.targetPath, this._document, this._selection);
            
            this._changeSubject.next(event);
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