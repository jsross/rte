import KeyListener from "../content-area/key-listener";
import RemoveCharacterUpdate from "../content-area/remove-character-update";
import ContentUpdate from "../content-area/content-update";
import ContentAreaSelection from "../content-area/content-area-selection";

export default class BackspaceKeyListener implements KeyListener{

    handleKey(key: string, selection: ContentAreaSelection): ContentUpdate {
        if(key === 'Backspace'){
            return new RemoveCharacterUpdate(selection.AnchorPointer);
        }

        return null;
    }

}