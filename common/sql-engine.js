// sql.js를 CDN에서 로드하고 DB를 초기화하는 모듈

let db = null;

async function initDB(tables) {
  // sql.js WASM 로드
  const SQL = await initSqlJs({
    locateFile: f =>
      `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${f}`
  });

  db = new SQL.Database();

  // tables 배열을 순회하며 CREATE TABLE + INSERT 실행
  tables.forEach(table => {
    db.run(table.createSQL);
    table.rows.forEach(row => {
      db.run(table.insertSQL, row);
    });
  });

  return db;
}

function runSQL(sql) {
  // 쿼리 실행 후 { columns, values } 반환
  // 에러 시 { error: message } 반환
  try {
    const results = db.exec(sql);
    if (!results.length) return { columns: [], values: [], empty: true };
    return results[0];
  } catch (e) {
    return { error: e.message };
  }
}