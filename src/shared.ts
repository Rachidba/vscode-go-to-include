import * as vscode from 'vscode';

export async function allowUserToChooseFileFromList(uris: vscode.Uri[]): Promise<vscode.Uri> {
    const result = await vscode.window.showQuickPick(uris.map(file => vscode.workspace.asRelativePath(file.fsPath)), {
        placeHolder: 'Choose a file'
    });
    if(result == undefined)
        throw new Error("includes-navigation extension: No item selected");
    return uris.filter(uri => uri.toString().includes(result))[0];
}

export function openUri(fileUri: vscode.Uri): void {
    vscode.workspace.openTextDocument(fileUri).then(doc => {
        vscode.window.showTextDocument(doc);
    });
}