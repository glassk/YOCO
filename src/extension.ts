import * as vscode from "vscode";
import { getCommentPrefix } from "./utils";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand("extension.addFileNameCommentAndCopy", () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showInformationMessage("No editor is active");
      return;
    }

    const document = editor.document;
    const selection = editor.selection;
    const selectedText = document.getText(selection);
    const fileName = document.fileName.split("/").pop() || "unknown_file";

    const commentPrefix = getCommentPrefix(document.languageId);
    const selectedTextWithFileNameComment = `${commentPrefix} ${fileName}\n${selectedText}`;

    editor
      .edit(editBuilder => {
        editBuilder.replace(selection, selectedTextWithFileNameComment);
      })
      .then(success => {
        if (success) {
          vscode.env.clipboard.writeText(selectedTextWithFileNameComment);
          vscode.window.showInformationMessage("Filename added and copied to clipboard!");
        } else {
          vscode.window.showErrorMessage("Failed to add filename");
        }
      });
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
