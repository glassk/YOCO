import * as vscode from "vscode";
import { generateFileNameComment, LanguageId } from "./utils";

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

    const fileNameComment = generateFileNameComment(document.languageId as LanguageId, fileName);
    const selectedTextWithFileNameComment = `${fileNameComment}\n${selectedText}`;

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
