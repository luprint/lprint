import { mockEditor } from "../testHelpers/mockVsCodeElements";
import uncommentPrintStatements from "./uncommentPrintStatements";

describe("uncommentPrintStatements", () => {
    test("SHOULD identify the first line", async () => {
        const mockLineAt = jest.fn().mockReturnValue({
            text: "--print(123)"
        });
        const editor = {
            ...mockEditor, ...{
                document: {
                    ...mockEditor.document,
                    lineAt: mockLineAt
                }
            }
        };

        const result = await uncommentPrintStatements(editor)([1]);

        expect(mockLineAt).toHaveBeenCalledTimes(1);
        expect(mockLineAt).toHaveBeenCalledWith(1);
        expect(editor.edit).toHaveBeenCalledTimes(1);
        expect(result).toBe(true);
    });

    test("SHOULD run over multiple lines", async () => {
        const mockLineAt = jest.fn().mockReturnValue({
            text: "--print(123)"
        });
        const editor = {
            ...mockEditor, ...{
                document: {
                    ...mockEditor.document,
                    lineAt: mockLineAt
                }
            }
        };

        const result = await uncommentPrintStatements(editor)([1, 2]);

        expect(mockLineAt).toHaveBeenCalledTimes(2);
        // The first argument of the first call to the function was 0
        expect(mockLineAt.mock.calls[0][0]).toBe(1);
        expect(mockLineAt.mock.calls[1][0]).toBe(2);
        expect(editor.edit).toHaveBeenCalledTimes(2);
        expect(result).toBe(true);
    });

    test("SHOULD comment out more complex examples", async () => {
        const mockLineAt = jest.fn().mockReturnValue({
            text: "--print(123)"
        });
        const editor = {
            ...mockEditor, ...{
                document: {
                    ...mockEditor.document,
                    lineAt: mockLineAt
                }
            }
        };


        const result = await uncommentPrintStatements(editor)([1, 2, 6, 9, 10]);

        expect(mockLineAt).toHaveBeenCalledTimes(5);
        expect(mockLineAt.mock.calls[0][0]).toBe(1);
        expect(mockLineAt.mock.calls[1][0]).toBe(2);
        expect(mockLineAt.mock.calls[2][0]).toBe(6);
        expect(mockLineAt.mock.calls[3][0]).toBe(9);
        expect(mockLineAt.mock.calls[4][0]).toBe(10);

        expect(editor.edit).toHaveBeenCalledTimes(5);
        expect(result).toBe(true);
    });

    test("SHOULD setup textEdit to add comment to start of line correctly", async () => {
        const mockLineAt = jest.fn().mockReturnValue({
            rangeIncludingLineBreak: 100,
            range: 99,
            text: "--print(123)"
        });
        const textEdit = {
            replace: jest.fn(),
        };
        const editor = {
            ...mockEditor, ...{
                document: {
                    ...mockEditor.document,
                    lineAt: mockLineAt
                }
            }
        };

        const result = await uncommentPrintStatements(editor)([1]);

        expect(editor.edit).toHaveBeenCalledTimes(1);

        await editor.edit.mock.calls[0][0](textEdit);

        expect(textEdit.replace).toHaveBeenCalledTimes(1);
        expect(textEdit.replace).toHaveBeenCalledWith(99, "print(123)");

        expect(result).toBe(true);
    });
});
