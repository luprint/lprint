import { mockEditor } from "../testHelpers/mockVsCodeElements";
import deleteGivenLines from "./deleteGivenLines";

describe("deleteGivenLines", () => {
    test("SHOULD delete the first line", async () => {
        const editor = mockEditor;


        const result = await deleteGivenLines(editor)([1]);

        expect(editor.document.lineAt).toHaveBeenCalledTimes(1);
        expect(editor.document.lineAt).toHaveBeenCalledWith(1);
        expect(editor.edit).toHaveBeenCalledTimes(1);
        expect(result).toBe(true);
    });

    test("SHOULD delete multiple lines", async () => {
        const editor = mockEditor;

        const result = await deleteGivenLines(editor)([1, 2]);

        expect(editor.document.lineAt).toHaveBeenCalledTimes(2);
        // The first argument of the first call to the function was 0
        expect(editor.document.lineAt.mock.calls[0][0]).toBe(1);
        expect(editor.document.lineAt.mock.calls[1][0]).toBe(1);
        expect(editor.edit).toHaveBeenCalledTimes(2);
        expect(result).toBe(true);
    });

    test("SHOULD delete a mixture of parts", async () => {
        const editor = mockEditor;

        const result = await deleteGivenLines(editor)([1, 2, 6, 9, 10]);

        expect(editor.document.lineAt).toHaveBeenCalledTimes(5);
        expect(editor.document.lineAt.mock.calls[0][0]).toBe(1);
        expect(editor.document.lineAt.mock.calls[1][0]).toBe(1);
        expect(editor.document.lineAt.mock.calls[2][0]).toBe(4);
        expect(editor.document.lineAt.mock.calls[3][0]).toBe(6);
        expect(editor.document.lineAt.mock.calls[4][0]).toBe(6);

        expect(editor.edit).toHaveBeenCalledTimes(5);
        expect(result).toBe(true);
    });

    test("SHOULD setup textEdit to delete line correctly", async () => {
        const mockLineAt = jest.fn().mockReturnValue({
            rangeIncludingLineBreak: "aaa"
        });
        const textEdit = {
            delete: jest.fn(),
        };
        const editor = {
            ...mockEditor, ...{
                document: {
                    ...mockEditor.document,
                    lineAt: mockLineAt
                }
            }
        };
        const result = await deleteGivenLines(editor)([1]);

        expect(editor.edit).toHaveBeenCalledTimes(1);

        await editor.edit.mock.calls[0][0](textEdit);

        expect(textEdit.delete).toHaveBeenCalledTimes(1);
        expect(textEdit.delete).toHaveBeenCalledWith("aaa");

        expect(result).toBe(true);
    });
});
