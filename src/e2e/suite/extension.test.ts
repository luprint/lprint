import * as assert from 'assert';
import * as vscode from 'vscode';
import prettyPrint from '../../print/prettyPrint';

suite('Extension Test Suite', async () => {
	test('SHOULD delete all print statements in file', async () => {
		const document = await vscode.workspace.openTextDocument(vscode.workspace.rootPath + "/src/e2e/examples/deleteAllPrintStatements.lua");
		const editor = await vscode.window.showTextDocument(document);

		const originalText = document.getText();

		await vscode.commands.executeCommand("luaPrint.deletePrintStatements");

		const remainingText = document.getText();

		assert.strictEqual(remainingText, "local test, great = 'hey', 'another'\nlocal test = 'another'\nlocal = 'another'\n");
	});

	test('SHOULD comment out all print statements in file', async () => {
		const document = await vscode.workspace.openTextDocument(vscode.workspace.rootPath + "/src/e2e/examples/commentOutAllPrintStatements.lua");
		const editor = await vscode.window.showTextDocument(document);

		const originalText = document.getText();

		await vscode.commands.executeCommand("luaPrint.commentOutPrintStatements");

		const remainingText = document.getText();

		assert.strictEqual(remainingText, `local test, great = 'hey', 'another'
--print('LTP: ' .. test.. 'variable: ' .. great .. ' Line: 0 File: test.lua')
--print('LTP: ' .. test variable:  great  .. ' Line: 0 File: test.lua')
--print('LTP: ' .. test, great .. ' Line: 0 File: test.lua')
--print('LTP: ' .. test, great ..
--  ' Line: 0 File: test.lua' .. type(test)
--)
--print('hey')
local test = 'another'
--print('LTP: ' .. test .. ' Line: 6 File: test.lua')
--print('LTP Line: 7 File: (test.lua)')
local = 'another'
--print('here')
--print('hey')
`);
	});

	test('SHOULD comment out pretty print statements in file', async () => {
		const document = await vscode.workspace.openTextDocument(vscode.workspace.rootPath + "/src/e2e/examples/commentOutPrettyPrintStatements.lua");
		const editor = await vscode.window.showTextDocument(document);

		const originalText = document.getText();

		await vscode.commands.executeCommand("luaPrint.commentOutPrintStatements");

		const remainingText = document.getText();

		assert.strictEqual(remainingText, `--function lpPrettyPrint(variable, indent)
--	local indentLevel = indent or 0
--	if type(variable) == 'table' then
--		local store = "{"
--		for key, in pairs(variable) do
--			if type(key) ~= 'number' then
--				key = '"'..key..'"'
--			end
--			store = store .. string.rep("    ", indentLevel + 1) .. key ..' = ' .. lpPrettyPrint(value, indentLevel + 1) .. ','
--		end
--		return store .. string.rep("    ", indentLevel) .. '} '
--	else
--		return tostring(variable) .." (" .. typeof(variable) .. ")"
--	end
--end
local test, great = 'hey', 'another'
--print('LTP: ' .. test.. 'variable: ' .. great .. ' Line: 0 File: test.lua')
--print('LTP: ' .. test variable:  great  .. ' Line: 0 File: test.lua')
`);
	});

	test('SHOULD uncomment all print statements in file', async () => {
		const document = await vscode.workspace.openTextDocument(vscode.workspace.rootPath + "/src/e2e/examples/uncommentPrintStatements.lua");
		const editor = await vscode.window.showTextDocument(document);

		const originalText = document.getText();

		await vscode.commands.executeCommand("luaPrint.uncommentPrintStatements");

		const remainingText = document.getText();

		assert.strictEqual(remainingText, `local test, great = 'hey', 'another'
 print('LTP: ' .. test.. 'variable: ' .. great .. ' Line: 0 File: test.lua')
 print('LTP: ' .. test variable:  great  .. ' Line: 0 File: test.lua')
print('LTP: ' .. test, great .. ' Line: 0 File: test.lua')
        print('LTP: ' .. test, great ..
    ' Line: 0 File: test.lua' .. type(test) )
    --TODO do not delete this
print('hey')local test = 'another'
print('LTP: ' .. test .. ' Line: 6 File: test.lua')
     print('LTP Line: 7 File: (test.lua)')
local = 'another'
      print('here')
print('hey')
print(
"a"
)
`);
	});

	test('SHOULD uncomment pretty print statements in file', async () => {
		const document = await vscode.workspace.openTextDocument(vscode.workspace.rootPath + "/src/e2e/examples/uncommentPrettyPrintStatements.lua");
		const editor = await vscode.window.showTextDocument(document);

		const originalText = document.getText();

		await vscode.commands.executeCommand("luaPrint.uncommentPrintStatements");

		const remainingText = document.getText();

		assert.strictEqual(remainingText, `function lpPrettyPrint(variable, indent)
	local indentLevel = indent or 0
	if type(variable) == 'table' then
		local store = "{"
		for key, in pairs(variable) do
			if type(key) ~= 'number' then
				key = '"'..key..'"'
			end
			store = store .. string.rep("    ", indentLevel + 1) .. key ..' = ' .. lpPrettyPrint(value, indentLevel + 1) .. ','
		end

		return store .. string.rep("    ", indentLevel) .. '} '

	else

		return tostring(variable) .." (" .. typeof(variable) .. ")"
	end

end
local test, great = 'hey', 'another'
print('LTP: ' .. test.. 'variable: ' .. great .. ' Line: 0 File: test.lua')
print('LTP: ' .. test variable:  great  .. ' Line: 0 File: test.lua')
`);
	});

	test('SHOULD add two new print statements line one empty one with variable', async () => {
		const document = await vscode.workspace.openTextDocument(vscode.workspace.rootPath + "/src/e2e/examples/newPrintStatement.lua");
		await vscode.window.showTextDocument(document, {
			selection: new vscode.Range(0, 0, 0, 0),
		});

		await vscode.commands.executeCommand("luaPrint.newPrintStatement");

		await vscode.window.showTextDocument(document, {
			selection: new vscode.Range(1, 0, 1, 0),
		});

		await vscode.commands.executeCommand("luaPrint.newPrintStatement");

		await vscode.window.showTextDocument(document, {
			selection: new vscode.Range(0, 6, 0, 11),
		});

		await vscode.commands.executeCommand("luaPrint.newPrintStatement");

		await vscode.window.showTextDocument(document, {
			selection: new vscode.Range(0, 7, 0, 11),
		});

		const newText = document.getText();

		assert.strictEqual(newText, `local test = 'another'
print("LP🎨3️⃣: test: " .. tostring(test) .. " type: " .. type(test) .. " in newPrintStatement.lua")
print("LP🎨1️⃣: called in newPrintStatement.lua")
print("LP🎨2️⃣: called in newPrintStatement.lua")
`);
	});

	test('SHOULD add two new pretty statements line one empty one with variable', async () => {
		const document = await vscode.workspace.openTextDocument(vscode.workspace.rootPath + "/src/e2e/examples/newPrettyPrint.lua");
		await vscode.window.showTextDocument(document, {
			selection: new vscode.Range(0, 0, 0, 0),
		});

		await vscode.commands.executeCommand("luaPrint.newPrettyPrint");

		await vscode.window.showTextDocument(document, {
			selection: new vscode.Range(16, 0, 16, 0),
		});

		await vscode.commands.executeCommand("luaPrint.newPrettyPrint");

		await vscode.window.showTextDocument(document, {
			selection: new vscode.Range(16, 6, 16, 11),
		});

		await vscode.commands.executeCommand("luaPrint.newPrettyPrint");

		await vscode.window.showTextDocument(document, {
			selection: new vscode.Range(16, 7, 16, 11),
		});

		const newText = document.getText();

		assert.strictEqual(newText, `${prettyPrint}local test = 'another'
print("LP🎨3️⃣: test: " .. lpPrettyPrint(test) .. " in newPrettyPrint.lua")
print("LP🎨2️⃣: called in newPrettyPrint.lua")
print("LP🎨1️⃣: called in newPrettyPrint.lua")
`);
	});
});
