    document.getElementById('copy-code-img').addEventListener('click', function() {
        // 숨겨진 프로젝트 코드 가져오기
        const projectCode = document.getElementById('hidden-project-code').value;

        // 클립보드에 복사
        navigator.clipboard.writeText(projectCode)
            .then(() => {
                alert('프로젝트 고유 코드가 클립보드에 복사되었습니다');
            })
            .catch(err => {
                console.error('클립보드 복사 실패:', err);
				alert('클립보드 복사에 실패했습니다. 브라우저를 확인해주세요.');
            });
    });