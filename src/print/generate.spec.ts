// TODO add test for getting file name
// TODO add more complex example test
// TODO add test that vscode gets called correctly

import { mockEditor } from "../testHelpers/mockVsCodeElements";
import generate from "./generate";

describe("generate", () => {
    beforeEach(() => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.987654321);
    });

    afterEach(() => {
        jest.spyOn(global.Math, 'random').mockRestore();
    });

    test("SHOULD call edit", async () => {
        const range = {};
        const mockRange = jest.fn().mockImplementation(() => range);
        class MockPosition {
            constructor() {
                return 10;
            }
        }

        const editor = mockEditor;

        const result = await generate(editor, MockPosition, mockRange)("text");

        expect(editor.edit).toHaveBeenCalledTimes(1);
        expect(result).toBe(true);
    });

    // TODO manually test it myself
    // TODO - get e2e test to work (how do I mock selection?)
    // TODO add in PrettyPrint - then I'm done with core functions!

    test("SHOULD setup textEdit to add print statement on line below of selection", async () => {
        const range = {};
        const mockRange = jest.fn().mockImplementation(() => range);
        const textEdit = {
            insert: jest.fn(),
        };
        const position = {};
        const mockPosition = jest.fn().mockImplementation(() => position);
        const editor = mockEditor;

        const result = await generate(editor, mockPosition, mockRange)(`print("LP🎨1: 🐸 called in test.lua"\n`);

        expect(mockEditor.edit).toHaveBeenCalledTimes(1);

        await mockEditor.edit.mock.calls[0][0](textEdit);

        expect(mockPosition).toHaveBeenCalledTimes(1);
        expect(mockPosition).toHaveBeenCalledWith(2, 0);
        expect(textEdit.insert).toHaveBeenCalledTimes(1);
        expect(textEdit.insert).toHaveBeenCalledWith(position, `print("LP🎨2️⃣: 🐸 called in test.lua")\n`);

        expect(result).toBe(true);
    });

    test("SHOULD setup textEdit to use variable if passed in", async () => {
        const range = {};
        const mockRange = jest.fn().mockImplementation(() => range);
        const textEdit = {
            insert: jest.fn(),
        };

        const position = {};
        const mockPosition = jest.fn().mockImplementation(() => position);

        const editor = {
            ...mockEditor, ...{
                document: {
                    ...mockEditor.document,
                    getText: jest.fn().mockReturnValue("test, second")
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

        const result = await generate(editor, mockPosition, mockRange)(`print("LP🎨1: 🐸 called in test.lua"\nLP🎨1\n`);

        expect(editor.edit).toHaveBeenCalledTimes(1);

        await editor.edit.mock.calls[0][0](textEdit);

        expect(mockPosition).toHaveBeenCalledTimes(1);
        expect(mockPosition).toHaveBeenCalledWith(2, 0);
        expect(textEdit.insert).toHaveBeenCalledTimes(1);
        expect(textEdit.insert).toHaveBeenCalledWith(position, `print("LP🎨3️⃣: test: " .. tostring(test) .. " type: " .. type(test) .. " | second: " .. tostring(second) .. " type: " .. type(second) .. " in test.lua")\n`);

        expect(result).toBe(true);
    });

    test("SHOULD setup prettyPrint if set to true", async () => {
        const range = {};
        const mockRange = jest.fn().mockImplementation(() => range);
        const textEdit = {
            insert: jest.fn(),
        };

        const position = {};
        const mockPosition = jest.fn().mockImplementation(() => position);

        const editor = {
            ...mockEditor, ...{
                document: {
                    ...mockEditor.document,
                    getText: jest.fn().mockReturnValue("test, second")
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

        const result = await generate(editor, mockPosition, mockRange, { isPrettyPrintEnabled: true })(`print("LP🎨1: 🐸 called in test.lua"\nLP🎨1\n`);

        expect(editor.edit).toHaveBeenCalledTimes(1);

        await editor.edit.mock.calls[0][0](textEdit);

        expect(mockPosition).toHaveBeenCalledTimes(1);
        expect(mockPosition).toHaveBeenCalledWith(2, 0);
        expect(textEdit.insert).toHaveBeenCalledTimes(1);
        expect(textEdit.insert).toHaveBeenCalledWith(position, `print(\"LP🎨3️⃣: test: \" .. lpPrettyPrint(test) .. \" | second: \" .. lpPrettyPrint(second) .. \" in test.lua\")\n`);

        expect(result).toBe(true);
    });
});
