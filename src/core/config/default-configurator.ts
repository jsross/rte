import Configurator from "./configurator";
import RteConfig from "./rte-config"
import DocumentFragmentRenderer from "@src/core/renderers/concrete/root-node-renderer"
import ListNodeRenderer from "@src/core/renderers/concrete/list-node-renderer";
import TextNodeRenderer from "@src/core/renderers/concrete/text-node-renderer";
import TextBlockNodeRenderer from "@src/core/renderers/concrete/text-block-node-renderer";
import ListItemNodeRenderer from "@src/core/renderers/concrete/list-item-node-renderer";
import Registry from "@src/core/ioc/registry";
import RenderEngine from "@src/core/render-engine";
import DocumentManagerFactory from "@src/core/document-management/document-manager-factory";
import Container from "@src/core/ioc/container";

export default class DefaultConfigurator implements Configurator {
    public configure() {
        RteConfig.registerRenderer('RootNode', new DocumentFragmentRenderer());
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