import KeyListener from "../content-area/key-listener";
import ContentAreaSelection from "../content-area/content-area-selection";

export default class ArrowKeyListener implements KeyListener{

    handleKey(key: string, selection: ContentAreaSelection): boolean {
        console.log(key);

        return false;
    }

}