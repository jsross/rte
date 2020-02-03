import Configurator from "./configurator";
import DefaultConfigurator from "./default-configurator";
import DocumentTreeNodeRenderer from "@src/core/renderers/abstract/document-tree-node-renderer";
import Container from "@src/core/ioc/container";
import DocumentTreeNode from "../nodes/abstract/document-tree-node";
import ActionHandler from "../document-management/actions/action-handler";
import Action from "../document-management/actions/action";
import IKeyEventListener from "../document-management/key-events/key-event-listener";

export default class RteConfig {
    public static configurator:Configurator = new DefaultConfigurator();
    public static container: Container;
    
    private static _rendererRegistry: Map<string, DocumentTreeNodeRenderer<any>> = new Map<string,DocumentTreeNodeRenderer<any>>();
    private static _actionHandlerRegistry: Map<string, ActionHandler<any, any>> = new Map<string, ActionHandler<any,any>>();
    private static _keyEventListeners: Array<IKeyEventListener> = new Array<IKeyEventListener>();

    public static configure():void {
        RteConfig.configurator.configure();
    }

    public static addKeyEventListener(listener: IKeyEventListener){
        this._keyEventListeners.push(listener);        
    }

    public static registerRenderer(nodeType: string, renderer: DocumentTreeNodeRenderer<any>) {
        this._rendererRegistry.set(nodeType, renderer);
    }

    public static registerActionHandler(nodeType:string, actionType: string, listener: ActionHandler<any,any>){
        var key = nodeType + ':' + actionType;
        
        this._actionHandlerRegistry.set(key, listener);
    }

    public static getKeyEventListener(key:string, modifiers:string[]){
        for(var listener of this._keyEventListeners) {
            var canHandle = listener.isHandleable(key,modifiers);

            if(canHandle){
                return listener;
            }
        }

        return null;
    }
    
    public static getRegisteredActionHandler<A extends Action, T extends DocumentTreeNode, >(nodeType:string, actionType:string) : ActionHandler<A,T> {
        var key = nodeType + ':' + actionType;

        if(!this._actionHandlerRegistry.has(key)){
            return null;
        }

        return this._actionHandlerRegistry.get(key);
    }

    public static getRegisteredRenderer(nodeType: string) : DocumentTreeNodeRenderer<any> {
        if(!this._rendererRegistry.has(nodeType)){
            return null;
        }

        return this._rendererRegistry.get(nodeType);
    }   
}