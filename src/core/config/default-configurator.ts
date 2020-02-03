import Configurator from "./configurator";
import RteConfig from "./rte-config"
import DocumentFragmentRenderer from "@src/core/renderers/concrete/root-node-renderer"
import ListNodeRenderer from "@src/core/renderers/concrete/list-node-renderer";
import TextNodeRenderer from "@src/core/nodes/concrete/text/text-node-renderer";
import TextBlockNodeRenderer from "@src/core/nodes/concrete/text-block/text-block-node-renderer";
import ListItemNodeRenderer from "@src/core/renderers/concrete/list-item-node-renderer";
import Registry from "@src/core/ioc/registry";
import RenderEngine from "@src/core/render-engine";
import Container from "@src/core/ioc/container";
import TextNodeInsertTextActionHandler from "../nodes/concrete/text/text-node-insert-text-action-handler";
import TextNodeDeleteActionHandler from "../nodes/concrete/text/text-node-delete-action-handler";
import TextBlockNodeInsertTextActionHandler from "../nodes/concrete/text-block/text-block-node-insert-text-action-handler";
import TextBlockNodeDeleteActionHandler from "../nodes/concrete/text-block/text-block-node-delete-action-handler";
import GroupActionHandler from "../nodes/concrete/group-action-handler";
import SelectActionHandler from "../nodes/concrete/select-action-handler";
import CharacterKeyEventListener from "../document-management/key-events/character-key-event-listener";

export default class DefaultConfigurator implements Configurator {
    public configure() {
        RteConfig.registerRenderer('RootNode', new DocumentFragmentRenderer());
        RteConfig.registerRenderer('ListNode', new ListNodeRenderer());
        RteConfig.registerRenderer('ListItemNode', new ListItemNodeRenderer());
        RteConfig.registerRenderer('TextNode', new TextNodeRenderer());
        RteConfig.registerRenderer('TextBlockNode', new TextBlockNodeRenderer());

        RteConfig.addKeyEventListener(new CharacterKeyEventListener());

        RteConfig.registerActionHandler('DocumentTreeNode','GroupAction', new GroupActionHandler());
        RteConfig.registerActionHandler('DocumentTreeNode', 'SelectAction', new SelectActionHandler());
        RteConfig.registerActionHandler('TextNode', 'InsertTextAction', new TextNodeInsertTextActionHandler());
        RteConfig.registerActionHandler('TextNode', 'DeleteAction', new TextNodeDeleteActionHandler());

        RteConfig.registerActionHandler('TextBlockNode', 'InsertTextAction', new TextBlockNodeInsertTextActionHandler());
        RteConfig.registerActionHandler('TextBlockNode', 'DeleteAction', new TextBlockNodeDeleteActionHandler());

        var registry = new Registry();

        registry.register(RenderEngine);

        RteConfig.container = new Container(registry);        
    }
}