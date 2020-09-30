import * as vscode from 'vscode';

export async function execute() : Promise<void> {
    const getIncludedFileNameFromLine = (line: string) : string => {
        const includeRegexp = /(include "(.*?)")/g;
		const regexpRes = includeRegexp.exec(line);
        if (regexpRes == null || regexpRes.length <= 2)
            throw new Error("includes-navigation extension: Invalid include format");
		return regexpRes[2].toString();
    }
    const getSelectedLine = () : string => {
        const activeTxtEditor = vscode.window.activeTextEditor;
        if (activeTxtEditor == undefined) 
            throw new Error("includes-navigation extension: No active text editor");
        const selectedLineNumber = activeTxtEditor.selection.active.line;
        return activeTxtEditor.document.lineAt(selectedLineNumber).text;
    }
    const findFilesByName = async (name: string) : Promise<vscode.Uri[]>  => {
        return await vscode.workspace.findFiles('**/' + name + '/*.hocon');
    }
    const allowUserToChooseFileFromList = async (uris: vscode.Uri[]): Promise<vscode.Uri> => {
        const result = await vscode.window.showQuickPick(uris.map(file => vscode.workspace.asRelativePath(file.fsPath)), {
			placeHolder: 'Choose a file'
        });
        if(result == undefined)
            throw new Error("includes-navigation extension: No item selected");
		return uris.filter(uri => uri.toString().includes(result))[0];
    }
    const openUri = (fileUri: vscode.Uri): void => {
        vscode.workspace.openTextDocument(fileUri).then(doc => {
			vscode.window.showTextDocument(doc);
		});
    }
    const getSelectedIncludeName = (): string => {
        const selectedLine = getSelectedLine();
        return getIncludedFileNameFromLine(selectedLine);
    }
    const selectedIncludeName = getSelectedIncludeName();
    const includedNameMatches = await findFilesByName(selectedIncludeName);
    try {
        const selectedFileByUser = await allowUserToChooseFileFromList(includedNameMatches);
        openUri(selectedFileByUser);
    } catch(e) {
    }
    
}