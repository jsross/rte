import KeyListener from "../content-area/key-listener";
import ContentUpdate from "../content-area/content-update";

export default class ArrowKeyListener implements KeyListener{

    handleKey(key: string, selection: Selection): ContentUpdate {
        console.log(key);

        return null;
    }

}