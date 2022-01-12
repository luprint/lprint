interface VsCodeRange {
    rangeIncludingLineBreak: any;
    range: {
        start: any
    },
    text: string;
}

export interface Range {
    new(start: any, end: any): any;
}

export interface VsCodeEditor {
    document: {
        lineAt: (lineNumber: number) => VsCodeRange,
        fileName: string,
        getText: (range: any) => string,
    },
    selection: {
        active: { line: number, character: number },
        anchor: { character: number },
    }
    edit: (callback: (textEdit: any) => Promise<void>) => Thenable<boolean>,
}
