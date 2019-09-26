import KeyListener from "../content-area/key-listener";

export default class ArrowKeyListener implements KeyListener{

    handleKey(key: string, selection: Selection): boolean {
        console.log(key);

        return false;
    }

}