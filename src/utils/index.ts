/**
 * Get the comment prefix for the given language
 * @param languageId VSCode Language Identifier (https://code.visualstudio.com/docs/languages/identifiers)
 * @returns Comment prefix for the given language
 */
export type LanguageId =
  | "javascript"
  | "typescript"
  | "python"
  | "plaintext"
  | "java"
  | "vue"
  | "c"
  | "cpp"
  | "csharp"
  | "css"
  | "go"
  | "html"
  | "json"
  | "ruby"
  | "shellscript"
  | "sql"
  | "swift"
  | "xml"
  | "xsl"
  | "yaml";

const languageCommentPrefixMap: Record<LanguageId, string> = {
  javascript: "//",
  typescript: "//",
  python: "#",
  plaintext: "//",
  java: "//",
  vue: "//",
  c: "//",
  cpp: "//",
  csharp: "//",
  css: "/*",
  go: "//",
  html: "<!--",
  json: "//",
  ruby: "#",
  shellscript: "#",
  sql: "--",
  swift: "//",
  xml: "<!--",
  xsl: "<!--",
  yaml: "#",
};

const languageCommentSuffixMap: Record<LanguageId, string> = {
  javascript: "",
  typescript: "",
  python: "",
  plaintext: "",
  java: "",
  vue: "",
  c: "",
  cpp: "",
  csharp: "",
  css: "*/",
  go: "",
  html: "-->",
  json: "",
  ruby: "",
  shellscript: "",
  sql: "",
  swift: "",
  xml: "-->",
  xsl: "-->",
  yaml: "",
};

export function generateFileNameComment(languageId: LanguageId, fileName: string): string {
  const prefix = languageCommentPrefixMap?.[languageId] ?? "";
  const suffix = languageCommentSuffixMap?.[languageId] ?? "";

  return `${prefix ? `${prefix} ${fileName.trim()} ${suffix}`.trim() : ""}`;
}
