import countInText from '../find/countInText';
import { Range, VsCodeEditor } from "../types/VScode";
import getFileName from '../vscodeHelpers/getFileName';
import getSelectedText from '../vscodeHelpers/getSelectedText';
import format from './format';

interface Config {
    isPrettyPrintEnabled: boolean,
}

export interface Position {
    new(line: number, character: number): any;
}

export default (editor: VsCodeEditor, position: Position, range: Range, config?: Config) => async (text: string) => {
    const count = countInText({ text, search: "LP🎨" });
    const formattedLine = await editor.edit(async (textEdit) => {
        textEdit.insert(new position(editor.selection.active.line + 1, 0)
            , format({
                count,
                file: getFileName(editor),
                variable: getSelectedText(editor, range),
                isPrettyPrintEnabled: config && config.isPrettyPrintEnabled,
            }));
    });

    return Promise.resolve(true);
};
