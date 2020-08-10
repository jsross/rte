import Configurator from "./configurator";
import DefaultConfigurator from "./default-configurator";
import Container from "@src/core/ioc/container";

export default class RteConfig {
    public static configurator:Configurator = new DefaultConfigurator();
    public static container: Container;
    
    public static configure():void {
        RteConfig.configurator.configure();
    }
    
}