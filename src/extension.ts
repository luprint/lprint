import * as vscode from 'vscode';
import commentOutPrintStatements from './comment/commentOutPrintStatements';
import deleteGivenLines from './delete/deleteGivenLines';
import printStatementLineNumbers from './find/printStatementLineNumbers';
import uncommentPrintStatements from './comment/uncommentPrintStatements';
import generate from './print/generate';
import addPrettyPrint from './print/addPrettyPrint';
import prettyPrintStatementLineNumbers from './find/prettyPrintStatementLineNumbers';

const deletePrintStatementsInFile = async () => {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;
	}
	const text = editor.document.getText();
	const prettyPrintLinesToDelete = prettyPrintStatementLineNumbers(text);
	const lineNumbersToDelete = printStatementLineNumbers(text);

	await deleteGivenLines(editor)([...prettyPrintLinesToDelete, ...lineNumbersToDelete]);

	return Promise.resolve(true);
};

const commentOutPrintStatementsInFile = async () => {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;
	}
	const text = editor.document.getText();
	const prettyPrintLinesToDelete = prettyPrintStatementLineNumbers(text);
	const lineNumbersToDelete = printStatementLineNumbers(text);

	await commentOutPrintStatements(editor)([...prettyPrintLinesToDelete, ...lineNumbersToDelete]);

	return Promise.resolve(true);
};

export const uncommentPrintStatementsInFile = async () => {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;
	}
	const text = editor.document.getText();
	const prettyPrintLinesToDelete = prettyPrintStatementLineNumbers(text);
	const linesToUncomment = printStatementLineNumbers(text);

	await uncommentPrintStatements(editor)([...prettyPrintLinesToDelete, ...linesToUncomment]);

	return Promise.resolve(true);
};

export const newPrintStatement = async () => {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;
	}
	const text = editor.document.getText();
	await generate(editor, vscode.Position, vscode.Range)(text);

	return Promise.resolve(true);
};

export const newPrettyPrint = async () => {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;
	}
	const text = editor.document.getText();

	await addPrettyPrint(editor, vscode.Position)(text);
	await generate(editor, vscode.Position, vscode.Range, { isPrettyPrintEnabled: true })(text);

	return Promise.resolve(true);
};

export function activate(context: vscode.ExtensionContext) {
	//TODO add prettyPrintStatement
	vscode.commands.registerCommand(
		'luaPrint.deletePrintStatements',
		deletePrintStatementsInFile,
	);

	//TODO add prettyPrintStatement
	vscode.commands.registerCommand(
		'luaPrint.commentOutPrintStatements',
		commentOutPrintStatementsInFile
	);

	//TODO add prettyPrintStatement
	vscode.commands.registerCommand(
		'luaPrint.uncommentPrintStatements',
		uncommentPrintStatementsInFile
	);

	vscode.commands.registerCommand(
		'luaPrint.newPrintStatement',
		newPrintStatement,
	);

	vscode.commands.registerCommand(
		'luaPrint.newPrettyPrint',
		newPrettyPrint,
	);
}

// this method is called when your extension is deactivated
export function deactivate() { }
