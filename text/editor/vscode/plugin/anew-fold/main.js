/**
* @fileoverview Produced by Anew Language.
* @author LO Corporation
* @copyright (c) 2012 - 2100
* @version 1.2.3
**/

const vscode = require(`vscode`);

const activate = (context) => {
	const load = vscode.window.setStatusBarMessage(`$(loading) Anew Fold : Activating Extension`);

	load.dispose();

	// 	vscode.window.showInformationMessage(`Hello World from anew-fold!`);

	// make use of vscode.workspace.onDidCreateFiles

	const current = {};

	vscode.workspace.textDocuments.map((document) => {
		current[document.fileName || ``] = true;
	});

	context.subscriptions.push(vscode.window.onDidChangeTextEditorSelection((event) => {
		vscode.commands.executeCommand(`editor.unfold`);
	}) , vscode.workspace.onDidOpenTextDocument((document) => {
		const id = String(document.fileName);

		if (!current[id]) {
			current[id] = true;
			vscode.commands.executeCommand(`editor.foldAll`);
			console.log(`folded` , id);
		}

		// console.log(document.fileName , vscode.workspace.textDocuments , current);
	}));
};

const deactivate = () => {
	return false;
};

module.exports = {
	"activate"   : activate ,
	"deactivate" : deactivate
};
