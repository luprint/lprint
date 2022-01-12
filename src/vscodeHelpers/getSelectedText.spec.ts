import { mockEditor } from "../testHelpers/mockVsCodeElements";
import getSelectedText from "./getSelectedText";

describe("getSelectedText", () => {
    it("SHOULD return nil if anchor and character are the same", () => {
        const range = {};
        const mockRange = jest.fn().mockImplementation(() => range);

        const editor = mockEditor;
        const selectedText = getSelectedText(mockEditor, mockRange);

        expect(selectedText).toBeUndefined();
        expect(mockRange).not.toHaveBeenCalled();
        expect(mockEditor.document.getText).not.toHaveBeenCalled();
    });

    it("SHOULD create range with anchor first if active is higher", () => {
        const range = {};
        const mockRange = jest.fn().mockImplementation(() => range);

        const editor = {
            ...mockEditor, ...{
                document: {
                    ...mockEditor.document,
                    getText: jest.fn().mockReturnValue("aaaa")
                },
                selection: {
                    active: {
                        line: 1,
                        character: 2,
                    },
                    anchor: {
                        character: 1,
                    }
                }
            }
        };

        const selectedText = getSelectedText(editor, mockRange);

        expect(mockRange).toHaveBeenCalledTimes(1);
        expect(mockRange).toHaveBeenCalledWith(editor.selection.anchor, editor.selection.active);
        expect(editor.document.getText).toHaveBeenCalledTimes(1);
        expect(editor.document.getText).toBeCalledWith(range);
        expect(selectedText).toBe("aaaa");
    });

    it("SHOULD create range with active first if anchor is higher", () => {
        const range = {};
        const mockRange = jest.fn().mockImplementation(() => range);

        const editor = {
            ...mockEditor, ...{
                document: {
                    ...mockEditor.document,
                    getText: jest.fn().mockReturnValue("aaaa")
                },
                selection: {
                    active: {
                        line: 1,
                        character: 1,
                    },
                    anchor: {
                        character: 2,
                    }
                }
            }
        };

        const selectedText = getSelectedText(editor, mockRange);

        expect(mockRange).toHaveBeenCalledTimes(1);
        expect(mockRange).toHaveBeenCalledWith(editor.selection.active, editor.selection.anchor);
        expect(editor.document.getText).toHaveBeenCalledTimes(1);
        expect(editor.document.getText).toBeCalledWith(range);
        expect(selectedText).toBe("aaaa");
    });
});
