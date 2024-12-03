async function openAuthorityModal() {
	const modal = document.getElementById("modal1");
	const content = document.getElementById("modal_content");

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
		const teamMembers = data.teamMembers || [];

		// 팀장과 팀원 분기 처리
		if (role === "팀장") {
			content.innerHTML = `
                <h2>프로젝트 관리</h2>
                <form id="updateProjectForm">
                    <!-- 프로젝트 정보 입력 -->
                    <div class="form-group">
                        <label for="p_title">프로젝트 제목</label>
                        <input id="p_title" name="p_title" type="text" style="width: 100%;" value="${project.p_title}">
                    </div>
                    <div class="form-group">
                        <label>시작일</label>
                        <input type="date" name="st_dt" style="margin-right: 10px;" value="${project.st_dt}">
                        <label>종료일</label>
                        <input type="date" name="ed_dt" value="${project.ed_dt}">
                    </div>
                    <div class="form-group">
                        <label>프로젝트 세부내용</label>
                        <textarea name="p_desc" rows="4" style="resize: none; width: 100%;">${project.p_desc}</textarea>
                    </div>
                    <div class="form-group">
                        <label>프로젝트 진행 상태</label>
                        <div>
                            <label><input type="radio" name="status" value="진행 예정" ${project.p_status === '진행 예정' ? 'checked' : ''}> 진행 예정</label>
                            <label><input type="radio" name="status" value="진행중" ${project.p_status === '진행중' ? 'checked' : ''}> 진행중</label>
                            <label><input type="radio" name="status" value="완료" ${project.p_status === '완료' ? 'checked' : ''}> 완료</label>
                        </div>
                    </div>
                    
                    <!-- 팀원 관리 -->
                    <h3>팀원 관리</h3>
                    <div class="team-management">
                        <div class="team-list">
                            ${teamMembers.filter(member => member.email !== currentUserEmail).map(member => `
                                <div class="team-member">
                                    <span>${member.email}</span>
                                    <button type="button" class="reject-btn" data-email="${member.email}">✖</button>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- 저장 버튼 -->
                    <div id="form_btn" style="text-align: center; margin-top: 20px;">
                        <button type="button" id="saveBtn">저장</button>
                        <button type="button" onclick="closeModal('modal1')">닫기</button>
                    </div>
                </form>
            `;

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

			document.querySelectorAll('.reject-btn').forEach(button => {
				button.addEventListener('click', event => {
					const email = event.target.getAttribute('data-email');
					const teamMember = event.target.closest(".team-member");

					if (teamMember) {
						// 팀 멤버를 삭제 상태로 표시
						teamMember.classList.add("removed");
						console.log("Marked for removal:", email);
					}
				});
			});

		} else {
			content.innerHTML = `
                <h2>프로젝트 탈퇴</h2>
                <form action="/leaveProject" method="POST">
                    <input type="hidden" name="p_idx" value="${project.p_idx}">
                    <div class="form-group">
                        <label for="p_title">프로젝트 제목</label>
                        <input id="p_title" name="p_title" type="text" style="width: 100%;" 
                               value="${project.p_title}" readonly>
                    </div>
                    <div class="form-group">
                        <label>시작일</label>
                        <input type="date" name="st_dt" style="margin-right: 10px;" 
                               value="${project.st_dt}" readonly>
                        <label>종료일</label>
                        <input type="date" name="ed_dt" value="${project.ed_dt}" readonly>
                    </div>
                    <div class="form-group">
                        <label>프로젝트 세부내용</label>
                        <textarea name="p_desc" rows="4" style="resize: none; width: 100%;" readonly>
                            ${project.p_desc}
                        </textarea>
                    </div>
                    <div id="form_btn" style="text-align: center; margin-top: 20px;">
                        <input type="submit" value="탈퇴" style="margin-right: 10px;">
                        <button type="button" onclick="closeModal('modal1')">닫기</button>
                    </div>
                </form>
            `;
		}

		modal.style.display = "block";

	} catch (error) {
		console.error("Error opening modal:", error);
		alert("오류 발생!");
	}
}

// 모달창 닫기 함수
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
    }
}
