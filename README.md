# SQL 기초 교육 뉴스레터 — 실습 위젯

비개발자(기획/마케팅/운영)를 위한 SQL 기초 교육 뉴스레터에 삽입하는 브라우저 기반 SQL 실습 위젯입니다.
먼데이닷컴 Workdocs에 임베드하여 사용합니다.

## 데모

GitHub Pages 배포 후:

```
https://{계정명}.github.io/sql-newsletter/                    ← 전체 회차 목록
https://{계정명}.github.io/sql-newsletter/lessons/01-select/  ← 1회차 실습
```

## 주요 기능

- **브라우저 SQL 실행** — sql.js(SQLite WebAssembly)로 서버 없이 쿼리 실행
- **예시 테이블 미리보기** — 탭으로 테이블 구조와 데이터 확인
- **미션 시스템** — 회차별 실습 미션 제공, 완료 시 체크 표시
- **힌트 자동 입력** — 미션 클릭 시 힌트 쿼리가 에디터에 채워짐
- **단축키** — `Ctrl+Enter` (Mac: `Cmd+Enter`)로 쿼리 실행

## 프로젝트 구조

```
sql-newsletter/
├── index.html              ← 전체 회차 목록 (랜딩 페이지)
├── common/
│   ├── style.css           ← 공통 스타일
│   ├── sql-engine.js       ← sql.js 초기화 및 쿼리 실행
│   └── ui.js               ← 에디터, 결과 테이블, 미션 UI
├── lessons/
│   ├── 01-select/
│   │   ├── index.html      ← 1회차 위젯 페이지
│   │   └── data.js         ← 1회차 테이블 및 미션 데이터
│   ├── 02-where/
│   │   ├── index.html
│   │   └── data.js
│   └── ...
└── README.md
```

## 커리큘럼

| 회차 | 주제 | 핵심 키워드 | 폴더 |
|------|------|-------------|------|
| 1 | SELECT와 FROM으로 데이터 꺼내기 | `SELECT`, `FROM`, `*` | `01-select` |
| 2 | 원하는 조건만 골라내기 | `WHERE`, `AND`, `OR` | `02-where` |
| 3 | 데이터 정렬과 개수 제한 | `ORDER BY`, `LIMIT` | `03-order-by` |
| 4 | 그룹별로 요약하기 | `GROUP BY`, `COUNT`, `SUM`, `AVG` | `04-group-by` |
| 5 | 조건부 집계 | `HAVING` | `05-having` |
| 6 | 두 테이블 합치기 | `INNER JOIN`, `ON` | `06-join` |
| 7 | LEFT JOIN과 NULL 다루기 | `LEFT JOIN`, `IS NULL` | `07-left-join` |
| 8 | 서브쿼리로 복잡한 질문 해결하기 | `(SELECT ...)` | `08-subquery` |
| 9 | CASE WHEN으로 데이터 분류하기 | `CASE WHEN THEN END` | `09-case-when` |
| 10 | 날짜 함수 활용하기 | `DATE`, `DATEADD` | `10-date` |
| 11 | 윈도우 함수 맛보기 | `ROW_NUMBER()`, `RANK()` | `11-window` |
| 12 | 실전 종합 문제 풀어보기 | 복합 쿼리 | `12-final` |

## 시작하기

### 1. 저장소 클론

```bash
git clone https://github.com/{계정명}/sql-newsletter.git
cd sql-newsletter
```

### 2. 로컬 확인

```bash
# 아무 정적 서버로 실행 (예: Python)
python3 -m http.server 8000

# 브라우저에서 확인
# http://localhost:8000/lessons/01-select/
```

> 참고: `file://` 프로토콜로 직접 열면 sql.js WASM 로딩이 실패할 수 있습니다. 반드시 HTTP 서버를 통해 확인하세요.

### 3. GitHub Pages 배포

```
저장소 Settings → Pages → Source: Deploy from a branch → Branch: main / root → Save
```

1~2분 후 `https://{계정명}.github.io/sql-newsletter/` 에서 확인 가능합니다.

## 새 회차 추가 방법

```bash
# 1. 폴더 생성 및 기존 파일 복사
mkdir lessons/02-where
cp lessons/01-select/index.html lessons/02-where/

# 2. data.js 작성 (테이블 + 미션 정의)
# 3. index.html에서 data.js 경로 확인
# 4. index.html 랜딩 페이지에 링크 추가
# 5. 커밋 & 푸시
git add .
git commit -m "2회차 WHERE 추가"
git push origin main
```

`data.js` 작성 형식:

```javascript
const LESSON = {
  id: 2,
  title: "원하는 조건만 골라내기 (WHERE)",
  subtitle: "엑셀의 필터 기능, SQL에서는 WHERE로 해요",
  defaultQuery: "-- 주문 금액이 20,000원 이상인 것만 조회해보세요\nSELECT * FROM orders WHERE total >= 20000;",

  tables: [
    {
      name: "orders",
      label: "주문",
      createSQL: "CREATE TABLE orders (order_id INT, ...)",
      insertSQL: "INSERT INTO orders VALUES (?,?,...)",
      columns: ["order_id", ...],
      rows: [...]
    }
  ],

  missions: [
    {
      id: "m1",
      text: "서울 고객만 조회해보세요",
      hint: "SELECT * FROM customers WHERE city = '서울';",
      check: (sql) => /where\s+.*city\s*=\s*'서울'/i.test(sql)
    }
  ]
};
```

## 먼데이닷컴 임베드

1. 뉴스레터 Workdoc을 열고 실습 삽입 위치에 커서 배치
2. `/embed` 입력 후 선택
3. 해당 회차 URL 붙여넣기: `https://{계정명}.github.io/sql-newsletter/lessons/01-select/`
4. 임베드 높이를 700px 이상으로 조정

## 기술적 참고 사항

### sql.js와 Snowflake의 차이

이 위젯은 SQLite 기반(sql.js)으로 동작하며, Snowflake 전용 문법은 지원하지 않습니다.

| 구분 | sql.js (SQLite) | Snowflake |
|------|-----------------|-----------|
| SELECT / WHERE / JOIN | 지원 | 지원 |
| GROUP BY / HAVING | 지원 | 지원 |
| 윈도우 함수 | 지원 | 지원 |
| QUALIFY | 미지원 | 지원 |
| FLATTEN / VARIANT | 미지원 | 지원 |
| 날짜 함수 | SQLite 방식 | Snowflake 방식 |

1~9회차(기초)는 표준 SQL로 위젯에서 충분히 실습 가능합니다.
10회차 이후 Snowflake 전용 내용은 뉴스레터 본문에서 설명하고, 실제 Snowflake 환경에서 실습하도록 안내하세요.

### 브랜드 커스터마이징

`common/style.css` 상단의 CSS 변수를 수정하면 전체 테마가 바뀝니다.

```css
:root {
  --primary: #534AB7;         /* → 회사 브랜드 컬러 */
  --primary-hover: #3C3489;
  --font-sans: 'Pretendard', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

### 보안 주의

- GitHub Pages는 공개 URL입니다. **실제 회사 데이터를 절대 넣지 마세요.**
- 모든 예시 데이터는 가상 데이터로 구성하세요.

## 의존성

| 라이브러리 | 버전 | 용도 | 로딩 방식 |
|-----------|------|------|-----------|
| [sql.js](https://github.com/sql-js/sql.js) | 1.8.0 | 브라우저 SQL 실행 | CDN (cdnjs) |

별도 빌드 도구(npm, webpack 등)가 필요 없습니다.
모든 의존성은 CDN에서 런타임에 로드됩니다.

## 라이선스

사내 교육 목적으로 제작되었습니다.
