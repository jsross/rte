import RootNode from "@src/core/nodes/concrete/root-node";
import ContentSelection from "@src/core/content-selection";
import DocumentTreeNode from "../nodes/abstract/document-tree-node";
import ParentNode from "../nodes/abstract/parent-node";
import HierarchyPath from "../hierarchy-path";
import { Observable, Subscription, Subject, Observer } from 'rxjs'
import KeyEvent from "./key-event";
import Action from "./actions/action";
import DocumentChangeEvent from "./document-change-event";
import ActionContext from "./actions/action-context";
import SelectAction from "./actions/select-action";
import GroupAction from "./actions/group-action";

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

    private _do(action:Action, context:ActionContext) : Action {
        switch (action.constructor) {
            case SelectAction:
                return this._doSelect(action as SelectAction, context);
            break;
            case GroupAction:
                return this._doGroupAction(action as GroupAction, context);
            break;
            default:
                var target = this._find(this._document, action.targetPath)[0];

                return target.do(action, context);
        }
    }

    private _doGroupAction(action:GroupAction, context:ActionContext) : Action {
        var undoActions = new Array<Action>();

        for(var childAction of action.actions) {
            var undoAction = this._do(childAction, context);

            if(undoAction) {
                undoActions.push(undoAction);
            }
        }

        return new GroupAction(action.targetPath, undoActions);
    }

    private _doSelect(action: SelectAction, context:ActionContext): Action {
        var originalTarget:HierarchyPath = null;
        var originalAnchor:HierarchyPath = null;
        var originalFocus:HierarchyPath;

        if(context.selection.FocusPointer){
            originalTarget = context.selection.AnchorPointer.getLowestCommonAncestor(context.selection.FocusPointer);

            originalAnchor = originalTarget.getRelativePath(context.selection.AnchorPointer);
            originalFocus = originalTarget.getRelativePath(context.selection.FocusPointer);
        }
        else {
            originalTarget = context.selection.AnchorPointer;
            originalAnchor = HierarchyPath.createRoot();
        }

        var anchor:HierarchyPath;
        var focus:HierarchyPath;

        anchor = action.targetPath.concat(action.startPath);
        focus = action.endPath ? action.targetPath.concat(action.endPath) : null;

        context.selection = new ContentSelection(anchor, focus);
        
        return new SelectAction(originalTarget, originalAnchor, originalFocus);
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

            var action = node.handleKeyEvent(event.key, event.modifiers, rootPath, relativeStartPath, relativeEndPath);
            
            if(action !== null){
                this._processAction(action);
            }
        }
        catch(e){
            console.error(e);
        }
    }

    private _processAction(action:Action):void{
        var context = new ActionContext(this._selection);

        this._do(action, context);

        this._selection = context.selection;

        var event = new DocumentChangeEvent(action.targetPath, this._document, this._selection);
        
        this._changeSubject.next(event);
    }

}