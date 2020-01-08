import Configurator from "./configurator";
import DefaultConfigurator from "./default-configurator";
import DocumentTreeNodeRenderer from "@src/core/renderers/abstract/document-tree-node-renderer";
import Container from "@src/core/ioc/container";

export default class RteConfig {
    public static configurator:Configurator = new DefaultConfigurator();
    public static container: Container;
    
    private static _rendererRegistry: Map<string, DocumentTreeNodeRenderer<any>> = new Map<string,DocumentTreeNodeRenderer<any>>();

    public static configure():void {
        RteConfig.configurator.configure();
    }

    public static registerRenderer(nodeType: string, renderer: DocumentTreeNodeRenderer<any>) {
        this._rendererRegistry.set(nodeType, renderer);
    }

    public static getRegisteredRenderer(nodeType: string) : DocumentTreeNodeRenderer<any> {
        if(!this._rendererRegistry.has(nodeType)){
            return null;
        }

        return this._rendererRegistry.get(nodeType);
    }   
}