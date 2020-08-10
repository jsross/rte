import Configurator from "./configurator";
import RteConfig from "./rte-config"
import Registry from "@src/core/ioc/registry";
import RenderEngine from "@src/core/render-engine";
import Container from "@src/core/ioc/container";

export default class DefaultConfigurator implements Configurator {
    public configure() {

        var registry = new Registry();

        registry.register(RenderEngine);

        RteConfig.container = new Container(registry);        
    }
}