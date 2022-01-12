import { VsCodeEditor } from "../types/VScode";
import removeCommentsFromLine from "./removeCommentsFromLine";

export default (editor: VsCodeEditor) => async (lines: number[]) => {
    for (let index = 0; index < lines.length; index++) {
        const lineNumber = lines[index];
        const line = editor.document.lineAt(lineNumber);

        await editor.edit(async (textEdit) => {
            textEdit.replace(line.range, removeCommentsFromLine(line.text));
        });
    }

    return Promise.resolve(true);
};
