// 결과를 테이블로 렌더링
function renderResult(result, targetEl) {
  if (result.error) {
    targetEl.innerHTML = `<div class="error">${result.error}</div>`;
    return;
  }
  if (result.empty) {
    targetEl.innerHTML = `<div class="success">실행 완료 (결과 없음)</div>`;
    return;
  }
  // columns + values → HTML 테이블 생성
}

// 미션 완료 체크
function checkMissions(sql, missions, completedSet) {
  missions.forEach(m => {
    if (m.check(sql)) completedSet.add(m.id);
  });
  renderMissions(missions, completedSet);
}