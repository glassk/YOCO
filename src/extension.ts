import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand("extension.addFilenameToCode", () => {
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
    const commentedFilename = `${commentPrefix} ${fileName}\n`;
    const newText = `${commentedFilename}${selectedText}`;

    editor
      .edit(editBuilder => {
        editBuilder.replace(selection, newText);
      })
      .then(success => {
        if (success) {
          vscode.env.clipboard.writeText(newText);
          vscode.window.showInformationMessage("Filename added and copied to clipboard!");
        } else {
          vscode.window.showErrorMessage("Failed to add filename");
        }
      });
  });

  context.subscriptions.push(disposable);
}

export function getCommentPrefix(languageId: string): string {
  switch (languageId) {
    case "javascript":
    case "typescript":
      return "//";
    case "python":
      return "# ";
    default:
      return "//";
  }
}

export function deactivate() {}
