import * as assert from "assert";
import * as vscode from "vscode";
import * as myExtension from "../extension";

suite("Extension Tests", function () {
  test("Comment Prefix is Correct", function () {
    assert.strictEqual(myExtension.getCommentPrefix("javascript"), "//");
    assert.strictEqual(myExtension.getCommentPrefix("python"), "# ");
    assert.strictEqual(myExtension.getCommentPrefix("plaintext"), "//");
  });

  test("Adds Filename to Code", async function () {
    const uri = vscode.Uri.file("src/test/temp.js");
    const document = await vscode.workspace.openTextDocument(uri);
    const editor = await vscode.window.showTextDocument(document);

    await vscode.commands.executeCommand("extension.addFilenameToCode");

    const text = editor.document.getText();
    assert.ok(text.includes("// File: temp.js"));
  });
});
