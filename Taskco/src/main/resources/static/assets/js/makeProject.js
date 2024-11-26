function openModal() {
	document.getElementById("projectModal").style.display = "block";
}

function closeModal() {
	document.getElementById("projectModal").style.display = "none";
}

// 프로젝트 생성 처리
function createProject() {
	const projectName = document.getElementById("projectName").value;
	if (projectName.trim() !== "") {
		// 프로젝트 이름이 유효하면 폼 제출
		document.getElementById("projectForm").submit();
	} else {
		alert("프로젝트명을 입력해주세요.");
	}
}

// Button1 클릭 이벤트 추가
document.getElementById("projBtn").addEventListener("click", openModal);