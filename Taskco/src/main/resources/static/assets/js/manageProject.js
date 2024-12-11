async function openAuthorityModal() {
	const modal = document.getElementById("modal1");
	const content = document.getElementById("modal_content");
	const overlay = document.getElementById("overlay");

	if (!modal || !content) {
		console.error("Modal or content element not found!");
		return;
	}

	try {
		// 서버로 AJAX 요청
		const response = await axios.get('/getProjInfo');
		const data = response.data;

		if (!data || !data.project) {
			console.error("Project data is null");
			return;
		}

		// 서버에서 받아온 데이터
		const role = data.role;
		const currentUserEmail = data.email;
		const project = data.project;
		console.log("project" + project.p_idx)
		const teamMembers = data.teamMembers || []; // 담기는 정보 확인 

		// 프로젝트 인덱스를 기반으로 팀원 정보를 불러오는 REST API
		const teamMateList = await reqTeamMateList(project.p_idx)
		console.log("teamMateList", teamMateList)

		// 팀장과 팀원 분기 처리
		if (role === "팀장") {
			content.innerHTML = `
    <div class="modal-content">
        <div class="modal-header bg-primary text-white">
            <h5 class="modal-title">프로젝트 관리</h5>
            <button type="button" class="btn-close" onclick="closeAuthorityModal()"></button>
        </div>
        <div class="modal-body">
            <form id="updateProjectForm">
                <!-- 프로젝트 정보 -->
                <div class="mb-3">
                    <label for="p_title" class="form-label">프로젝트 제목</label>
                    <input id="p_title" name="p_title" type="text" class="form-control" value="${project.p_title}">
                </div>
                <div class="mb-3">
                    <label class="form-label">프로젝트 기간</label>
                    <div class="d-flex">
                        <input type="date" name="st_dt" class="form-control me-2" value="${project.st_dt}">
                        <input type="date" name="ed_dt" class="form-control" value="${project.ed_dt}">
                    </div>
                </div>
                <div class="mb-3">
                    <label for="p_desc" class="form-label">프로젝트 세부내용</label>
                    <textarea name="p_desc" id="p_desc" rows="4" class="form-control">${project.p_desc}</textarea>
                </div>
                <div class="mb-3">
                    <label class="form-label">프로젝트 진행 상태</label>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="status" id="status1" value="진행 예정" ${project.p_status === '진행 예정' ? 'checked' : ''}>
                        <label class="form-check-label" for="status1">진행 예정</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="status" id="status2" value="진행중" ${project.p_status === '진행중' ? 'checked' : ''}>
                        <label class="form-check-label" for="status2">진행중</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="status" id="status3" value="완료" ${project.p_status === '완료' ? 'checked' : ''}>
                        <label class="form-check-label" for="status3">완료</label>
                    </div>
                </div>
                
                <!-- 팀원 관리 -->
                <h6 class="mt-4">팀원 관리</h6>
                <table class="table table-bordered table-hover">
                    <thead class="table-light">
                        <tr>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody class="team-list">
                        <!-- 팀원 리스트는 JavaScript로 렌더링 -->
                    </tbody>
                </table>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" id="saveBtn" class="btn btn-primary">저장</button>
            <button type="button" id="project-delete-btn" class="btn btn-danger">프로젝트 삭제</button>
            <button type="button" id="project-out-btn" class="btn btn-warning">프로젝트 탈퇴</button>
            <button type="button" class="btn btn-secondary" onclick="closeAuthorityModal()">닫기</button>
        </div>
    </div>
`;


			/* ${teamMembers.filter(member => member.email !== currentUserEmail).map(member => `
						<div class="team-member">
						   <span>${member.email}</span>
						   <button type="button" class="reject-btn" data-email="${member.email}">✖</button>
						</div>
					 `).join('')}*/

			//인원 정보를 list에 렌더링 
			renderTeamMateList(modal, teamMateList)

			// 저장 버튼 이벤트 핸들러
			document.getElementById("saveBtn").addEventListener("click", async () => {
				const requestBody = {
					p_idx: project.p_idx,
					p_title: document.querySelector("#p_title").value,
					st_dt: document.querySelector("input[name='st_dt']").value,
					ed_dt: document.querySelector("input[name='ed_dt']").value,
					p_desc: document.querySelector("textarea[name='p_desc']").value,
					p_status: document.querySelector("input[name='status']:checked").value,
					deletedMembers: Array.from(document.querySelectorAll(".team-member.removed span")).map(span => span.textContent),
				};

				try {
					const response = await axios.post('/updateProject', requestBody);
					if (response.status === 200) {
						alert("프로젝트가 성공적으로 업데이트되었습니다.");
						location.reload();
					} else {
						alert("업데이트 실패.");
					}
				} catch (error) {
					console.error("Error updating project:", error);
					alert("업데이트 중 오류 발생.");
				}
			});



		} else { // 팀원용
			content.innerHTML = `
    <div class="modal-content">
        <div class="modal-header bg-secondary text-white">
            <h5 class="modal-title">프로젝트 탈퇴</h5>
            <button type="button" class="btn-close" onclick="closeAuthorityModal()"></button>
        </div>
        <div class="modal-body">
            <form>
                <div class="mb-3">
                    <label for="p_title" class="form-label">프로젝트 제목</label>
                    <input id="p_title" name="p_title" type="text" class="form-control" value="${project.p_title}" readonly>
                </div>
                <div class="mb-3">
                    <label class="form-label">프로젝트 기간</label>
                    <div class="d-flex">
                        <input type="date" name="st_dt" class="form-control me-2" value="${project.st_dt}" readonly>
                        <input type="date" name="ed_dt" class="form-control" value="${project.ed_dt}" readonly>
                    </div>
                </div>
                <div class="mb-3">
                    <label for="p_desc" class="form-label">프로젝트 설명</label>
                    <textarea name="p_desc" id="p_desc" rows="4" class="form-control" readonly>${project.p_desc}</textarea>
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <form action="/leaveProject" method="POST">
                <input type="hidden" name="p_idx" value="${project.p_idx}">
                <button type="submit" class="btn btn-danger">탈퇴</button>
                <button type="button" class="btn btn-secondary" onclick="closeAuthorityModal()">닫기</button>
            </form>
        </div>
    </div>
`;

		}


		modal.style.display = "flex"; // Change display to flex for proper centering
		modal.style.justifyContent = "center";
		modal.style.alignItems = "center";
		overlay.style.display = "block"; // 오버레이 표시

	} catch (error) {
		console.error("Error opening modal:", error);
		alert("오류 발생!");
	}
}


// 팀원정보 렌더링 함수
function renderTeamMateList(modal, teamMateList) {
    const teamMemberArea = modal.querySelector(".team-list");
    teamMemberArea.innerHTML = ""; // 기존 리스트 초기화

    teamMateList.forEach((member) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${member.email}</td>
            <td>${member.teamMateName}</td>
            <td>
                <select class="form-select form-select-sm">
                    <option value="팀원" ${member.teamMateRole === "팀원" ? "selected" : ""}>팀원</option>
                    <option value="팀장" ${member.teamMateRole === "팀장" ? "selected" : ""}>팀장</option>
                </select>
            </td>
            <td>
                <button type="button" class="btn btn-danger btn-sm reject-btn" data-email="${member.email}">방출</button>
            </td>
        `;

        // 방출 버튼 이벤트 추가
        const rejectBtn = row.querySelector(".reject-btn");
        rejectBtn.addEventListener("click", () => {
            row.classList.toggle("table-danger"); // 방출 상태 강조
            const isRemoved = row.classList.contains("table-danger");
            rejectBtn.textContent = isRemoved ? "복구" : "방출";
        });

        teamMemberArea.appendChild(row);
    });
}


// 사용 예시
function leaveProject(modal, p_idx, currentUserEmail) {
	// 팀장이 있는지 확인
	const canLeave = isLeaderAvailableAfterLeaving(modal, currentUserEmail);

	if (!canLeave) {
		alert("다른 팀원 중 팀장이 없습니다. 탈퇴할 수 없습니다.");
		return;
	}

	// 프로젝트 탈퇴 로직 실행
	console.log(`프로젝트(${p_idx})에서 ${currentUserEmail} 탈퇴 가능`);
}



// 팀장 프로젝트 탈퇴 : 팀원 목록을 보고 다른 인원 중 팀장이 없으면 탈퇴 불가하게 만들 것. 
function isLeaderLeavingAvailable(modal, currentUserEmail) {
	// 팀원의 현재 role 정보를 가져오기
	const projectRoleList = getCurrentRolesAsObject(modal);

	// 현재 사용자의 이메일을 제외한 리스트 생성
	const otherMembers = Object.entries(projectRoleList).filter(
		([email, role]) => email !== currentUserEmail
	);

	// 나머지 팀원 중 "팀장" 역할이 있는지 확인
	return otherMembers.some(([email, role]) => role === "팀장");

}

// 팀원의 현재 role 정보를 email:role로 배출하는 함수
function getCurrentRolesAsObject(modal) {
	// 팀원 정보가 포함된 영역 선택
	let teamMemberArea = modal.querySelector(".team-list");

	// 모든 팀원 배지를 가져오기
	let teamMembers = teamMemberArea.querySelectorAll(".team-member");

	// 결과를 저장할 객체
	let rolesObject = {};

	teamMembers.forEach(member => {
		// 현재 팀원의 선택된 role 값을 가져오기
		const roleSelect = member.querySelector(".role-status select");
		const selectedRole = roleSelect ? roleSelect.value : null;

		// email 값을 키로, role 값을 객체에 추가
		const email = member.querySelector("span").textContent.trim();
		rolesObject[email] = selectedRole;
	});

	return rolesObject;
}


// 모달창 닫기 함수
function closeAuthorityModal() {
	const modal = document.getElementById("modal1");
	const overlay = document.getElementById("overlay");

	if (modal && overlay) {
		modal.style.display = "none"; // 모달 숨김
		overlay.style.display = "none"; // 오버레이 숨김
	} else {
		console.error("Modal or overlay element not found!");
	}
}
