import Configurator from "./configurator";
import RteConfig from "./rte-config"
import BasicParentNodeRenderer from "../renderers/parent-node-renderer"
import ListNodeRenderer from "../renderers/list-node-renderer";
import TextNodeRenderer from "../renderers/text-node-renderer";
import BlockNodeRenderer from "../renderers/block-node-renderer";

export default class DefaultConfigurator implements Configurator {
    public configure() {
        RteConfig.registerRenderer('BasicParentNode', new BasicParentNodeRenderer());
        RteConfig.registerRenderer('ListNode', new ListNodeRenderer());
        RteConfig.registerRenderer('TextNode', new TextNodeRenderer());
        RteConfig.registerRenderer('BlockNode', new BlockNodeRenderer());
    }
}