import { mockEditor } from "../testHelpers/mockVsCodeElements";
import addPrettyPrint from "./addPrettyPrint";
import prettyPrint from "./prettyPrint";

describe("addPrettyPrint", () => {
    it("SHOULD not call edit if the the file doesn't include the function definition", async () => {
        const editor = mockEditor;
        const position = {};
        const mockPosition = jest.fn().mockImplementation(() => position);

        await addPrettyPrint(editor, mockPosition)("function lpPrettyPrint(");

        expect(editor.edit).not.toHaveBeenCalled();
    });

    it("SHOULD call edit if the the file does include the function definition", async () => {
        const editor = mockEditor;
        const position = {};
        const mockPosition = jest.fn().mockImplementation(() => position);

        await addPrettyPrint(editor, mockPosition)("\nfunction print(variable, indent)\nsome\n\nanother");

        expect(editor.edit).toHaveBeenCalledTimes(1);
    });

    it("SHOULD insert pretty print at the top of the file", async () => {
        const editor = mockEditor;
        const textEdit = {
            insert: jest.fn(),
        };
        const position = {};
        const mockPosition = jest.fn().mockImplementation(() => position);

        await addPrettyPrint(editor, mockPosition)("\nfunction print(variable, indent)\nsome\n\nanother");

        await editor.edit.mock.calls[0][0](textEdit);

        expect(mockPosition).toHaveBeenCalledTimes(1);
        expect(mockPosition).toHaveBeenCalledWith(0, 0);
        expect(textEdit.insert).toHaveBeenCalledTimes(1);
        expect(textEdit.insert).toHaveBeenCalledWith(position, prettyPrint);
    });
});
