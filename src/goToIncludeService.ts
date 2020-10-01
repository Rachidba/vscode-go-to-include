import * as vscode from 'vscode';
import * as shared from './shared';

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
    const getSelectedIncludeName = (): string => {
        const selectedLine = getSelectedLine();
        return getIncludedFileNameFromLine(selectedLine);
    }
    const selectedIncludeName = getSelectedIncludeName();
    const includedNameMatches = await findFilesByName(selectedIncludeName);
    try {
        const selectedFileByUser = await shared.allowUserToChooseFileFromList(includedNameMatches);
        shared.openUri(selectedFileByUser);
    } catch(e) {
    }
}