import Configurator from "./configurator";
import RteConfig from "./rte-config"
import DocumentFragmentRenderer from "../renderers/concrete/document-fragment-node-renderer"
import ListNodeRenderer from "../renderers/concrete/list-node-renderer";
import TextNodeRenderer from "../renderers/concrete/text-node-renderer";
import TextBlockNodeRenderer from "../renderers/concrete/text-block-node-renderer";
import ListItemNodeRenderer from "../renderers/concrete/list-item-node-renderer";

export default class DefaultConfigurator implements Configurator {
    public configure() {
        RteConfig.registerRenderer('DocumentFragmentNode', new DocumentFragmentRenderer());
        RteConfig.registerRenderer('ListNode', new ListNodeRenderer());
        RteConfig.registerRenderer('ListItemNode', new ListItemNodeRenderer());
        RteConfig.registerRenderer('TextNode', new TextNodeRenderer());
        RteConfig.registerRenderer('TextBlockNode', new TextBlockNodeRenderer());
    }
}