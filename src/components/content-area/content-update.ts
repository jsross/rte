export default interface ContentUpdate {
    execute(content:Node[]):void;

    undoAction:ContentUpdate;
}