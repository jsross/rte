import Configurator from "./configurator";
import DefaultConfigurator from "./default-configurator";
import DocumentTreeNodeRenderer from "@src/core/renderers/abstract/document-tree-node-renderer";
import Container from "@src/core/ioc/container";
import INodeKeyListener from "../document-management/node-key-listeners/node-key-listener";
import DocumentTreeNode from "../nodes/abstract/document-tree-node";

export default class RteConfig {
    public static configurator:Configurator = new DefaultConfigurator();
    public static container: Container;
    
    private static _rendererRegistry: Map<string, DocumentTreeNodeRenderer<any>> = new Map<string,DocumentTreeNodeRenderer<any>>();
    private static _nodeKeyListenerRegistry: Map<string, INodeKeyListener<any>> = new  Map<string, INodeKeyListener<any>>();

    public static configure():void {
        RteConfig.configurator.configure();
    }

    public static registerNodeKeyListener(nodeType: string, listener: INodeKeyListener<any>){
        this._nodeKeyListenerRegistry.set(nodeType, listener);
    }

    public static registerRenderer(nodeType: string, renderer: DocumentTreeNodeRenderer<any>) {
        this._rendererRegistry.set(nodeType, renderer);
    }

    public static getRegisteredNodeKeyListener<T extends DocumentTreeNode>(nodeType: string) : INodeKeyListener<T> {
        if(!this._nodeKeyListenerRegistry.has(nodeType)){
            return null;
        }

        return this._nodeKeyListenerRegistry.get(nodeType);
    }

    public static getRegisteredRenderer(nodeType: string) : DocumentTreeNodeRenderer<any> {
        if(!this._rendererRegistry.has(nodeType)){
            return null;
        }

        return this._rendererRegistry.get(nodeType);
    }   
}