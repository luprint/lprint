import countInText from "./countInText";

describe("countInText", () => {
    it("SHOULD return 0 if there are no instances in text", () => {
        expect(countInText({
            text: `"LP1: called in another.lua"`,
            search: "LP🎨",
        })).toBe(0);
    });

    it("SHOULD return number of instances for simple text", () => {
        expect(countInText({
            text: `"LP🎨1: called in another.lua"`,
            search: "LP🎨",
        })).toBe(1);
    });

    it("SHOULD return number of instances for complex text", () => {
        expect(countInText({
            text: `
            print("LP🎨1️⃣: called in newPrintStatement.lua")
            print("LP🎨2️⃣: called in newPrintStatement.lua")
            local another = 'hey'
            print("LP🎨3️⃣:" .. tostring(another) .. ": type:" type() .. ". newPrintStatement.lua")
            `,
            search: "LP🎨",
        })).toBe(3);
    });
});
