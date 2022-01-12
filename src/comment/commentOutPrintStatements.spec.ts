import { mockEditor } from "../testHelpers/mockVsCodeElements";
import commentOutPrintStatements from "./commentOutPrintStatements";

describe("commentOutPrintStatements", () => {
    test("SHOULD identify the first line", async () => {
        const editor = mockEditor;

        const result = await commentOutPrintStatements(editor)([1]);

        expect(editor.document.lineAt).toHaveBeenCalledTimes(1);
        expect(editor.document.lineAt).toHaveBeenCalledWith(1);
        expect(editor.edit).toHaveBeenCalledTimes(1);
        expect(result).toBe(true);
    });

    test("SHOULD run over multiple lines", async () => {
        const editor = mockEditor;

        const result = await commentOutPrintStatements(editor)([1, 2]);

        expect(editor.document.lineAt).toHaveBeenCalledTimes(2);
        // The first argument of the first call to the function was 0
        expect(editor.document.lineAt.mock.calls[0][0]).toBe(1);
        expect(editor.document.lineAt.mock.calls[1][0]).toBe(2);
        expect(editor.edit).toHaveBeenCalledTimes(2);
        expect(result).toBe(true);
    });

    test("SHOULD comment out more complex examples", async () => {
        const editor = mockEditor;

        const result = await commentOutPrintStatements(editor)([1, 2, 6, 9, 10]);

        expect(editor.document.lineAt).toHaveBeenCalledTimes(5);
        expect(editor.document.lineAt.mock.calls[0][0]).toBe(1);
        expect(editor.document.lineAt.mock.calls[1][0]).toBe(2);
        expect(editor.document.lineAt.mock.calls[2][0]).toBe(6);
        expect(editor.document.lineAt.mock.calls[3][0]).toBe(9);
        expect(editor.document.lineAt.mock.calls[4][0]).toBe(10);

        expect(editor.edit).toHaveBeenCalledTimes(5);
        expect(result).toBe(true);
    });

    test("SHOULD setup textEdit to add comment to start of line correctly", async () => {
        const mockLineAt = jest.fn().mockReturnValue({
            range: {
                start: 1
            }
        });
        const textEdit = {
            insert: jest.fn(),
        };

        const editor = {
            ...mockEditor, ...{
                document: {
                    ...mockEditor.document,
                    ...{ lineAt: mockLineAt },
                },
            }
        };

        const result = await commentOutPrintStatements(editor)([1]);

        expect(editor.edit).toHaveBeenCalledTimes(1);

        await editor.edit.mock.calls[0][0](textEdit);

        expect(textEdit.insert).toHaveBeenCalledTimes(1);
        expect(textEdit.insert).toHaveBeenCalledWith(1, "--");

        expect(result).toBe(true);
    });
});
