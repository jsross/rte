import { ContentAreaElement } from "../../export";

export default interface ContentUpdate {
    execute(contentArea:ContentAreaElement):void;

    undoAction:ContentUpdate;
}