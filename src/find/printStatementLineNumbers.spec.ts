import printStatementLineNumbers from './printStatementLineNumbers';

describe("printStatementLineNumbers", () => {
    test('SHOULD spot a single print', () => {
        expect(printStatementLineNumbers("test\nprint()\nanother")).toEqual([1]);
    });

    test('SHOULD spot multiple prints', () => {
        expect(printStatementLineNumbers("test\nprint()\nprint(\"with lots of text \")\ngreat stuff")).toEqual([1, 2]);
    });

    test('SHOULD spot multi line prints', () => {
        expect(printStatementLineNumbers("print(\"hey\"\n)\ngreat stuff")).toEqual([0, 1]);
    });

    test('SHOULD spot complex multi line prints', () => {
        expect(printStatementLineNumbers("print(\"()()hey\"\n()\n)great stuff\nprint()")).toEqual([0, 1, 2, 3]);
    });

    test('SHOULD spot complex multiple multi line prints', () => {
        expect(printStatementLineNumbers("print(\"()()hey\"\n()\n)great stuff\n()()()great\nprint(well this is good][]\nanother()((\n)))")).toEqual([0, 1, 2, 4, 5, 6]);
    });
});
