import KeyListener from "../content-area/key-listener";
import RemoveCharacterUpdate from "../content-area/remove-character-update";
import ContentUpdate from "../content-area/content-update";

export default class BackspaceKeyListener implements KeyListener{

    handleKey(key: string, selection: Selection): ContentUpdate {
        if(key === 'Backspace'){
            if(selection.isCollapsed){
                return new RemoveCharacterUpdate(selection.anchorNode, selection.anchorOffset);
            }
        }

        return null;
    }

}