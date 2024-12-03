document.addEventListener('DOMContentLoaded', function () {
    console.log("스크립트 로드 완료");

    const container = document.getElementById('copy-code');
    const hiddenCode = document.getElementById('hidden-project-code');

    if (!container || !hiddenCode) {
        console.error('필수 요소를 찾을 수 없습니다.');
        return;
    }

    console.log("요소 찾기 성공:", container, hiddenCode);

    container.addEventListener('click', function () {
        console.log("클릭 이벤트 실행");

        if (!navigator.clipboard) {
            console.error('클립보드 API가 지원되지 않는 브라우저입니다.');
            alert('현재 브라우저는 클립보드 복사를 지원하지 않습니다.');
            return;
        }

        navigator.clipboard.writeText(hiddenCode.value)
            .then(() => alert('복사 성공! 클립보드에 저장되었습니다.'))
            .catch(err => {
                console.error("복사 실패:", err);
                alert('복사 실패: ' + err.message);
            });
    });
});
