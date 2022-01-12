import { Range, VsCodeEditor } from '../types/VScode';


export default ({
    selection: { anchor, active },
    document,
}: VsCodeEditor, range: Range): string | undefined => {
    if (active.character === anchor.character) {
        return;
    }

    const selectedRange =
        active.character > anchor.character
            ? new range(anchor, active)
            : new range(active, anchor);

    return document.getText(selectedRange);
};
