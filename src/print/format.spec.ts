import format from "./format";

describe("format", () => {
    beforeEach(() => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789);
    });

    afterEach(() => {
        jest.spyOn(global.Math, 'random').mockRestore();
    });

    describe("WITH no variable", () => {
        it("SHOULD return a print statement with a count for the file", () => {
            expect(format({
                count: 10,
                file: "fileName.lua"
            })).toBe(`print("LP🎨11: called in fileName.lua")\n`);
        });

        it("SHOULD return a print statement with a count for the file even with prettyPrint set to true", () => {
            expect(format({
                count: 10,
                file: "fileName.lua",
                isPrettyPrintEnabled: true,
            })).toBe(`print("LP🎨11: called in fileName.lua")\n`);
        });

        const emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];
        emojis.forEach((element, index) => {
            it("SHOULD return print statement with emoji for count", () => {
                expect(format({
                    count: index,
                    file: "another.lua",
                })).toBe(`print("LP🎨${element}: called in another.lua")\n`);
            });
        });
    });

    describe("WITH variable", () => {
        it("SHOULD wrap the variable in type and tostring", () => {
            expect(format({
                count: 10,
                file: "fileName.lua",
                variable: "test",
            })).toBe(`print("LP🎨11: test: " .. tostring(test) .. " type: " .. type(test) .. " in fileName.lua")\n`);
        });

        it("SHOULD wrap the variable in prettyPrint", () => {
            expect(format({
                count: 10,
                file: "fileName.lua",
                variable: "test",
                isPrettyPrintEnabled: true,
            })).toBe(`print("LP🎨11: test: " .. lpPrettyPrint(test) .. " in fileName.lua")\n`);
        });

        it("SHOULD wrap multiple variables in type and tostring", () => {
            expect(format({
                count: 10,
                file: "fileName.lua",
                variable: "test, second",
            })).toBe(`print("LP🎨11: test: " .. tostring(test) .. " type: " .. type(test) .. " | second: " .. tostring(second) .. " type: " .. type(second) .. " in fileName.lua")\n`);
        });

        it("SHOULD wrap multiple variables in prettyPrint", () => {
            expect(format({
                count: 10,
                file: "fileName.lua",
                variable: "test, second",
                isPrettyPrintEnabled: true,
            })).toBe(`print("LP🎨11: test: " .. lpPrettyPrint(test) .. " | second: " .. lpPrettyPrint(second) .. " in fileName.lua")\n`);
        });
    });
});
