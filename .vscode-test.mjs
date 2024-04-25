import { defineConfig } from "@vscode/test-cli";

export default defineConfig({
  label: "sample-test",
  files: ["out/test/**/*.test.js", "src/tests/*.test.mts"],
});
