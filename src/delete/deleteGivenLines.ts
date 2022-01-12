import { VsCodeEditor } from "../types/VScode";

export default (editor: VsCodeEditor) => async (lines: number[]) => {
    for (let index = 0; index < lines.length; index++) {
        const lineNumber = lines[index];
        const line = editor.document.lineAt(lineNumber - index);

        await editor.edit(async (textEdit) => {
            textEdit.delete(line.rangeIncludingLineBreak);
        });
    }

    return Promise.resolve(true);
};
