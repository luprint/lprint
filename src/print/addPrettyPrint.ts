import { VsCodeEditor } from "../types/VScode";
import { Position } from "./generate";
import prettyPrint from "./prettyPrint";

export default (editor: VsCodeEditor, position: Position) => async (text: string) => {
    if (!text.includes("function lpPrettyPrint")) {
        await editor.edit(async (textEdit) => {
            const startOfFile = new position(0, 0);
            textEdit.insert(startOfFile, prettyPrint);
        });
    }

    return Promise.resolve();
};
