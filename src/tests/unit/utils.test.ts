import { generateFileNameComment } from "../../utils";

describe("generateFileNameComment 테스트 - VS Code Language ID에 따라 파일명이 포함된 주석 문자열을 만든다", function () {
  it("JavaScript에 대해 올바르게 포맷해야 한다", () => {
    const result = generateFileNameComment("javascript", "example.js");
    expect(result).toEqual("// example.js");
  });

  it("Python에 대해 올바르게 포맷해야 한다", () => {
    const result = generateFileNameComment("python", "example.py");
    expect(result).toEqual("# example.py");
  });

  it("CSS에서는 여는 주석과 닫는 주석을 모두 처리해야 한다", () => {
    const result = generateFileNameComment("css", "style.css");
    expect(result).toEqual("/* style.css */");
  });

  it("HTML에 대해 올바르게 포맷해야 한다", () => {
    const result = generateFileNameComment("html", "index.html");
    expect(result).toEqual("<!-- index.html -->");
  });

  it("지원하지 않는 언어에 대해서는 빈 문자열을 반환해야 한다", () => {
    // @ts-expect-error 지원하지 않는 언어 ID
    const result = generateFileNameComment("nonexistent", "file.ext");
    expect(result).toEqual("");
  });

  it("파일 이름에 공백이 포함되어 있어도 올바르게 처리해야 한다", () => {
    const result = generateFileNameComment("javascript", "my file.js");
    expect(result).toEqual("// my file.js");
  });

  it("파일 이름의 공백을 올바르게 처리해야 한다", () => {
    const result = generateFileNameComment("python", "    example.py   ");
    expect(result).toEqual("# example.py");
  });

  it("빈 파일 이름을 처리할 수 있어야 한다", () => {
    const result = generateFileNameComment("ruby", "");
    expect(result).toEqual("#");
  });

  it("접미사가 필요하지 않은 경우에도 실패하지 않아야 한다", () => {
    const result = generateFileNameComment("go", "main.go");
    expect(result).toEqual("// main.go");
  });
});
