# 디자인 패턴을 사용하여 설계하기

## 프로젝트 개요

- VSCode Extension 개발 프로젝트 https://github.com/YouOnlyCopyOnce/YOCO (7조 김유리, 윤기쁨, 정성훈)
- 블록 처리한 코드 상단에 자동으로 파일명 주석을 추가하고 클립보드에 복사하는 기능을 제공합니다.
- 블로그 포스트, 기술문서, ChatGPT 등에 코드 블록을 삽입할 때 종종 프로젝트의 구조나 설명을 위해 해당 코드가 포함된 파일의 이름을 주석으로 추가하곤 합니다. 저희는 매번 코드 블록의 파일명을 직접 추가하는 불편함을 줄이고자 하였습니다.
- 최소 기능 구현 및 배포를 우선 달성한 후 추가 기능 구현과 지속적인 오픈소스 유지를 위한 환경 설정을 목표로 프로젝트를 진행하고 있습니다.

---

## 1단계 문제 인식
- 기능을 추가할 때마다 복잡도가 높아져 유지보수가 어려워질 수 있다.
- 예시
  - 프로그래밍 언어마다 적용할 수 있는 주석의 형태가 다르다.
    - e.g., TypeScript: `//`, Python: `#`, HTML: `<!-- -->`
  - 블록 처리한 코드에 적용된 인덴트의 최소와 최대를 비교하여 불필요한 인덴트가 적용되지 않은 텍스트가 복사되어야 한다.
  - 그 외 옵션과 기능이 추가될 때마다 관리 포인트가 많아진다.


## 2단계 원인 파악
-  각 요소별로 다양한 케이스를 고려하여 단계적으로 기능을 구현하고 적용해야 한다. 사용자 입장에서 체감하는 기능 자체는 단순하지만, 프로그래밍 언어, 인덴트, 사용자가 선택한 옵션 등 고려할 점이 많다.


## 3단계 해결방향 고민
- 기존 코드를 수정하지 않고도 기능을 확장할 수 있으면 좋겠다.
- 기능이 추가되더라도 복잡도가 높아지지 않도록 세부 알고리즘을 캡슐화하면서 전반적인 플로우를 파악하기 쉽도록 구성하고 싶다.


## 디자인 패턴 적용: 전략 패턴

- 주석 스타일을 선택하는 과정을 전략 패턴으로 구현하여 새로운 주석 스타일을 추가하거나 기존의 스타일을 변경할 때 기존 코드를 수정하지 않고도 확장할 수 있다.
- `TODO`: [기존의 extension 전체 코드](https://github.com/YouOnlyCopyOnce/YOCO/blob/4a5592fc3de2fd460d95f84172a7836b2b9cf522/src/extension.ts)에 통합되어 있는 기능을 세분화하여 단계적으로 전략을 적용하도록 구현할 수 있다. 주석 스타일 외에도 인덴트 고려, 백틱 추가 옵션 등의 기능을 추가할 때에도 전략 패턴을 활용해보기

```typescript
// 예시: 주석을 생성하는 빌더 클래스
class CommentBuilder {
    private comment: string;

    constructor() {
        this.comment = "";
    }

    addPrefix(prefix: string): CommentBuilder {
        this.comment += prefix + "\n";
        return this;
    }

    addCodeBlock(codeBlock: string): CommentBuilder {
        this.comment += codeBlock;
        return this;
    }

    build(): string {
        return this.comment;
    }
}

const filename: string = "example.ts";
const codeBlock: string = "console.log('Hello, World!');";
const languageId: string = "typescript"; // 예시로 TypeScript 언어를 사용
const commentStyleSelector: CommentStyleSelector = new CommentStyleSelector(languageId);
const commentPrefix: string = commentStyleSelector.getCommentPrefix(filename);

const comment: string = new CommentBuilder()
    .addPrefix(commentPrefix)
    .addCodeBlock(codeBlock)
    .build();

console.log(comment);
```

## 디자인 패턴 적용: 빌더 패턴

- 주석을 생성하는 과정을 빌더 패턴으로 구현하여 코드의 가독성을 높일 수 있다. 주석을 생성하는 데 필요한 다양한 단계를 분리하여 코드를 더 관리하기 쉽게 한다.
- 처리하는 언어가 추가되더라도 언어별로 코드를 분리하였기에 쉽고 효과적으로 관리할 수 있을 것으로 기대된다.
- `TODO`: 기존에 구현해놓은 [해당 유틸 함수](https://github.com/YouOnlyCopyOnce/YOCO/blob/df5ffc414e31e0f3f97b7def0e99c41cbf81b80a/src/utils/generateFileNameComment.ts)에 적용하여 개선해보기

```typescript
// 예시: 주석을 생성하는 빌더 클래스
class CommentBuilder {
    private comment: string;

    constructor() {
        this.comment = "";
    }

    addPrefix(prefix: string): CommentBuilder {
        this.comment += prefix + "\n";
        return this;
    }

    addCodeBlock(codeBlock: string): CommentBuilder {
        this.comment += codeBlock;
        return this;
    }

    build(): string {
        return this.comment;
    }
}

const filename: string = "example.ts";
const codeBlock: string = "console.log('Hello, World!');";
const languageId: string = "typescript"; // 예시로 TypeScript 언어를 사용
const commentStyleSelector: CommentStyleSelector = new CommentStyleSelector(languageId);
const commentPrefix: string = commentStyleSelector.getCommentPrefix(filename);

const comment: string = new CommentBuilder()
    .addPrefix(commentPrefix)
    .addCodeBlock(codeBlock)
    .build();

console.log(comment);
```