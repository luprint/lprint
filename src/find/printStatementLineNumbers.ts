const PRINT_STRING = "print";
const OPEN_BRACKET = "(";
const CLOSED_BRACKET = ")";
const countOccurrencesOfSubstring = (contents: { text: string, substring: string }) => {
    const { text, substring } = contents;

    return text.split(substring).length - 1;
};

export default (text: string): number[] => {
    const linesWithPrintStatement: number[] = [];

    const arrayOfLines = text.split("\n");
    arrayOfLines.forEach((line, index) => {
        if (line.includes(PRINT_STRING)) {
            let openBracketCounter = countOccurrencesOfSubstring({ text: line, substring: OPEN_BRACKET });
            let closedBracketCounter = countOccurrencesOfSubstring({ text: line, substring: CLOSED_BRACKET });
            linesWithPrintStatement.push(index);
            if (openBracketCounter !== closedBracketCounter) {
                let counter = 1;
                while (openBracketCounter !== closedBracketCounter) {
                    linesWithPrintStatement.push(index + counter);
                    const nextLineDown = arrayOfLines[index + counter];
                    openBracketCounter += countOccurrencesOfSubstring({ text: nextLineDown, substring: OPEN_BRACKET });
                    closedBracketCounter += countOccurrencesOfSubstring({ text: nextLineDown, substring: CLOSED_BRACKET });
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
