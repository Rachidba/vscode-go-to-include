import * as vscode from 'vscode';
import * as goToInclude from './goToIncludeService';
import * as findReferencesService from './findReferencesService';

export function activate(context: vscode.ExtensionContext) {
	const goToIncludeDisposable = vscode.commands.registerCommand('extension.goToInclude', async () => {
		await goToInclude.execute();
	});
	const findReferencesDisposable = vscode.commands.registerCommand('extension.findReferences', async () => {
		await findReferencesService.execute();
	});
	context.subscriptions.push(goToIncludeDisposable, findReferencesDisposable);
}
