import Configurator from "./configurator";
import RteConfig from "./rte-config"
import DocumentFragmentRenderer from "../renderers/document-fragment-node-renderer"
import ListNodeRenderer from "../renderers/list-node-renderer";
import TextNodeRenderer from "../renderers/text-node-renderer";
import BlockNodeRenderer from "../renderers/block-node-renderer";
import ListItemNodeRenderer from "../renderers/list-item-node-renderer";

export default class DefaultConfigurator implements Configurator {
    public configure() {
        RteConfig.registerRenderer('DocumentFragmentNode', new DocumentFragmentRenderer());
        RteConfig.registerRenderer('ListNode', new ListNodeRenderer());
        RteConfig.registerRenderer('ListItemNode', new ListItemNodeRenderer());
        RteConfig.registerRenderer('TextNode', new TextNodeRenderer());
        RteConfig.registerRenderer('BlockNode', new BlockNodeRenderer());
    }
}