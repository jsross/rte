import Configurator from "./configurator";
import DefaultConfigurator from "./default-configurator";
import RteNodeRenderer from "../renderers/abstract/rte-node-renderer";

export default class RteConfig {
    public static configurator:Configurator = new DefaultConfigurator();
    private static _rendererRegistry: Map<string, RteNodeRenderer<any>> = new Map<string,RteNodeRenderer<any>>();

    public static configure():void {
        RteConfig.configurator.configure();
    }

    public static registerRenderer(nodeType: string, renderer: RteNodeRenderer<any>) {
        this._rendererRegistry.set(nodeType, renderer);
    }

    public static getRegisteredRenderer(nodeType: string) : RteNodeRenderer<any> {
        if(!this._rendererRegistry.has(nodeType)){
            return null;
        }

        return this._rendererRegistry.get(nodeType);
    }   

}