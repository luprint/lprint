import prettyPrint from '../print/prettyPrint';
import prettyPrintStatementLineNumbers from './prettyPrintStatementLineNumbers';

describe("prettyPrintStatementLineNumbers", () => {
    test('SHOULD spot a single prettyPrint', () => {
        expect(prettyPrintStatementLineNumbers(prettyPrint)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
    });

    test('SHOULD spot a single prettyPrint in a more complex file', () => {
        expect(prettyPrintStatementLineNumbers("hey\n" + prettyPrint + "\nhello end\nfunction another()\nend")).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
    });

    test('SHOULD cope with a formatting change of prettyPrint', () => {
        expect(prettyPrintStatementLineNumbers(prettyPrint.substring(0, prettyPrint.length - 4) + "\nhello\nend\nwhatever\lpPrettyPrint")).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]);
    });

    test('SHOULD return empty array if function definition is missing', () => {
        expect(prettyPrintStatementLineNumbers("function lpPrettyPrint" + "\nhello\nend\nwhatever\lpPrettyPrint")).toEqual([]);
    });
});
