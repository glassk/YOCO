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
