import KeyListener from "../content-area/key-listener";
import ContentAreaSelection from "../content-area/content-area-selection";
import ContentUpdate from "../content-area/content-update";

export default class ArrowKeyListener implements KeyListener{

    handleKey(key: string, selection: ContentAreaSelection): ContentUpdate {
        console.log(key);

        return null;
    }

}