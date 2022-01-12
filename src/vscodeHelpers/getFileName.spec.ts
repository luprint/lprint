import getFileName from "./getFileName";

describe("getFileName", () => {
    it("SHOULD get the file name of active file", () => {
        const editor = {
            document: {
                fileName:
                    "c://person/thing/another/test.lua"
            }
        };
        expect(getFileName(editor)).toBe("test.lua");
    });
});
