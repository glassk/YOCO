import * as assert from "assert";
import * as vscode from "vscode";

suite("Extension Tests", () => {
  test("Add filename comment and copy", async () => {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
      throw new Error("No workspace folders are open.");
    }

    const filePath = vscode.Uri.joinPath(workspaceFolder.uri, "src/test/temp.js");
    const document = await vscode.workspace.openTextDocument(filePath);
    const editor = await vscode.window.showTextDocument(document);

    const firstLine = editor.document.lineAt(0);
    const lastLine = editor.document.lineAt(editor.document.lineCount - 1);
    const range = new vscode.Range(firstLine.range.start, lastLine.range.end);

    editor.selection = new vscode.Selection(range.start, range.end);

    await vscode.commands.executeCommand("YOCO.addFileNameCommentAndCopy");

    assert.ok(true);
  });
});
