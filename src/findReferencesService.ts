import * as vscode from 'vscode';
import * as path from 'path';
import * as shared from './shared';

export async function execute() : Promise<void> {
    const getSelectedItemName = () : string => {
        const activeTextEditor = vscode.window.activeTextEditor;
        if (activeTextEditor == undefined) 
            throw new Error("includes-navigation extension: No active text editor");
        const currentDocumentUri = activeTextEditor.document.uri.fsPath;
        const splitedUri = currentDocumentUri.split(path.sep);
        return splitedUri[splitedUri.length - 2];
    }
    const buildIncludeStatement = (itemName: string) : string => {
        return `include "${itemName}"`
    }
    const isDocumentIncludes = async (uri: vscode.Uri, includeStatement: string) : Promise<boolean> => {
        const docuement = await vscode.workspace.openTextDocument(uri);
        return docuement.getText().includes(includeStatement);
    }
    const getReferences = async (includeStatement: string) : Promise<vscode.Uri[]> => {
        const filesUris = await vscode.workspace.findFiles('**');
        const filterResutl: vscode.Uri[] = new Array();
        for (let uri of filesUris) {
            try {
                if (await isDocumentIncludes(uri, includeStatement))
                    filterResutl.push(uri);
            } catch(e) {}
        }
        return filterResutl;
    }
    const slectedItemName = getSelectedItemName();
    const includeStatement =  buildIncludeStatement(slectedItemName);
    const res = await getReferences(includeStatement);
    try {
        const selectedFileByUser = await shared.allowUserToChooseFileFromList(res);
        shared.openUri(selectedFileByUser);
    } catch(e) {
    }
}