import KeyListener, { KeyListenerResult } from "../content-area/key-listener";
import ContentAreaSelection from "../content-area/content-area-selection";

export default class ArrowKeyListener implements KeyListener{

    handleKey(key: string, selection: ContentAreaSelection): KeyListenerResult {
        console.log(`key: ${key} at ${selection.AnchorPointer}`);

        return new KeyListenerResult();
    }

}