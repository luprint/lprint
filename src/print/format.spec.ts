import format from "./format";

describe("format", () => {
    beforeEach(() => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.987654321);
    });

    afterEach(() => {
        jest.spyOn(global.Math, 'random').mockRestore();
    });

    describe("WITH no variable", () => {
        it("SHOULD return a print statement with a count for the file", () => {
            expect(format({
                count: 10,
                file: "fileName.lua"
            })).toBe(`print("LPð¨11: ð called in fileName.lua")\n`);
        });

        it("SHOULD return a print statement with a count for the file even with prettyPrint set to true", () => {
            expect(format({
                count: 10,
                file: "fileName.lua",
                isPrettyPrintEnabled: true,
            })).toBe(`print("LPð¨11: ð called in fileName.lua")\n`);
        });

        const emojis = ["1ï¸â£", "2ï¸â£", "3ï¸â£", "4ï¸â£", "5ï¸â£", "6ï¸â£", "7ï¸â£", "8ï¸â£", "9ï¸â£", "ð"];
        emojis.forEach((element, index) => {
            it("SHOULD return print statement with emoji for count", () => {
                expect(format({
                    count: index,
                    file: "another.lua",
                })).toBe(`print("LPð¨${element}: ð called in another.lua")\n`);
            });
        });
    });

    describe("WITH variable", () => {
        it("SHOULD wrap the variable in type and tostring", () => {
            expect(format({
                count: 10,
                file: "fileName.lua",
                variable: "test",
            })).toBe(`print("LPð¨11: test: " .. tostring(test) .. " type: " .. type(test) .. " in fileName.lua")\n`);
        });

        it("SHOULD wrap the variable in prettyPrint", () => {
            expect(format({
                count: 10,
                file: "fileName.lua",
                variable: "test",
                isPrettyPrintEnabled: true,
            })).toBe(`print("LPð¨11: test: " .. lpPrettyPrint(test) .. " in fileName.lua")\n`);
        });

        it("SHOULD wrap multiple variables in type and tostring", () => {
            expect(format({
                count: 10,
                file: "fileName.lua",
                variable: "test, second",
            })).toBe(`print("LPð¨11: test: " .. tostring(test) .. " type: " .. type(test) .. " | second: " .. tostring(second) .. " type: " .. type(second) .. " in fileName.lua")\n`);
        });

        it("SHOULD wrap multiple variables in prettyPrint", () => {
            expect(format({
                count: 10,
                file: "fileName.lua",
                variable: "test, second",
                isPrettyPrintEnabled: true,
            })).toBe(`print("LPð¨11: test: " .. lpPrettyPrint(test) .. " | second: " .. lpPrettyPrint(second) .. " in fileName.lua")\n`);
        });
    });
});
