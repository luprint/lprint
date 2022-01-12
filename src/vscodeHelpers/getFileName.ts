interface VsCodeFileEditor {
    document: {
        fileName: string
    }
}
export default (editor: VsCodeFileEditor) => {
    const lastWord = editor.document.fileName.lastIndexOf('/');

    return editor.document.fileName.slice(lastWord + 1);
};
