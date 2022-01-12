const PRINT_STRING = "print";
const OPEN_BRACKET = "(";
const CLOSED_BRACKET = ")";
const countOccurrencesOfSubstring = (contents: { text: string, substring: string | RegExp }) => {
    const { text, substring } = contents;

    return text.split(substring).length - 1;
};

export default (text: string): number[] => {
    const linesWithPrintStatement: number[] = [];

    const arrayOfLines = text.split("\n");
    arrayOfLines.forEach((line, index) => {
        if (line.includes("function lpPrettyPrint(")) {
            let indentationStart = countOccurrencesOfSubstring({
                text: line, substring: /if|function|for/g
            });
            let endCounter = countOccurrencesOfSubstring({ text: line, substring: "end" });
            linesWithPrintStatement.push(index);
            if (indentationStart !== endCounter) {
                let counter = 1;
                while (indentationStart !== endCounter) {
                    linesWithPrintStatement.push(index + counter);
                    const nextLineDown = arrayOfLines[index + counter];
                    indentationStart += countOccurrencesOfSubstring({ text: nextLineDown, substring: /if|function|for/g });
                    endCounter += countOccurrencesOfSubstring({ text: nextLineDown, substring: "end" });
                    counter += 1;

                    if (counter + index > arrayOfLines.length) {
                        break;
                    }
                }
            }
        }
    });

    return linesWithPrintStatement;
};
