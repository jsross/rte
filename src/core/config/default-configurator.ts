import Configurator from "./configurator";
import RteConfig from "./rte-config"
import DocumentFragmentRenderer from "../renderers/concrete/document-fragment-node-renderer"
import ListNodeRenderer from "../renderers/concrete/list-node-renderer";
import TextNodeRenderer from "../renderers/concrete/text-node-renderer";
import TextBlockNodeRenderer from "../renderers/concrete/text-block-node-renderer";
import ListItemNodeRenderer from "../renderers/concrete/list-item-node-renderer";
import Registry from "../ioc/registry";
import RenderEngine from "../render-engine";
import DocumentManagerFactory from "../document-management/document-manager-factory";
import Container from "../ioc/container";

export default class DefaultConfigurator implements Configurator {
    public configure() {
        RteConfig.registerRenderer('DocumentFragmentNode', new DocumentFragmentRenderer());
        RteConfig.registerRenderer('ListNode', new ListNodeRenderer());
        RteConfig.registerRenderer('ListItemNode', new ListItemNodeRenderer());
        RteConfig.registerRenderer('TextNode', new TextNodeRenderer());
        RteConfig.registerRenderer('TextBlockNode', new TextBlockNodeRenderer());

        var registry = new Registry();

        registry.register(RenderEngine);
        registry.register(DocumentManagerFactory);

        RteConfig.container = new Container(registry);        
    }
}