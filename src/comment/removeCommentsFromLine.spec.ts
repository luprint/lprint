import removeCommentsFromLine from './removeCommentsFromLine';

//TODO replace each line with commented out print statements with result
//TODO add e2e test
describe("removeCommentsFromLine", () => {
    test('SHOULD remove comment marks in-front of print', () => {
        expect(removeCommentsFromLine("--print() another")).toEqual("print() another");
    });

    test('SHOULD remove multiple comment marks in-front of print', () => {
        expect(removeCommentsFromLine(" --  --print() another for this")).toEqual("   print() another for this");
    });

    test('SHOULD ignore comments after the print statement multiple', () => {
        expect(removeCommentsFromLine(" --  --print() another -- for this")).toEqual("   print() another -- for this");
    });
});
