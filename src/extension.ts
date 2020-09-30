import * as vscode from 'vscode';
import * as goToInclude from './goToIncludeService';

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('extension.goToInclude', async () => {
		await goToInclude.execute();
	});

	context.subscriptions.push(disposable);
}
