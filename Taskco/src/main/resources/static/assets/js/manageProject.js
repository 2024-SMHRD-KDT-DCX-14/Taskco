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
		console.log("project"+project.p_idx)
		const teamMembers = data.teamMembers || []; // 담기는 정보 확인 
		
		// 프로젝트 인덱스를 기반으로 팀원 정보를 불러오는 REST API
		const teamMateList = await reqTeamMateList(project.p_idx)
		console.log("teamMateList",teamMateList)
		
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
                           
                        </div>
                    </div>

                    <!-- 버튼 모아놓는 위치 저장, 삭제-->
                    <div id="form_btn" style="text-align: center; margin-top: 20px;">
                        <button type="button" id="saveBtn">저장</button>
                        <button type="button" id="project-delete-btn">프로젝트 삭제</button>
                        <button type="button" id="project-out-btn">프로젝트 탈퇴</button>
                        <button type="button" onclick="closeModal('modal1')">닫기</button>
                    </div>
                
                </form>
            `;

			/* ${teamMembers.filter(member => member.email !== currentUserEmail).map(member => `
							<div class="team-member">
								<span>${member.email}</span>
								<button type="button" class="reject-btn" data-email="${member.email}">✖</button>
							</div>
						`).join('')}*/

			//인원 정보를 list에 렌더링 
			renderTeamMateList(modal,teamMateList)

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
			
			// 프로젝트 탈퇴 이벤트 핸들러
			document.getgetElementById("project-out-btn").addEventListener("click",{
				leaveProject(modal, p_idx, currentUserEmail)
				
				
			})
			
			
			
		
		} else { // 팀원용
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


// 팀원정보 렌더링 함수
function renderTeamMateList(modal, teamMateList){
	
	// 팀메이트 정보를 추가할 위치 지정
	let teamMemberArea = modal.querySelector(".team-list")
	
	teamMateList.forEach(member=> {
/*		

		<div class="team-member">
			<span>${member.email}</span>
			<button type="button" class="reject-btn" data-email="${member.email}">✖</button>
		</div>
*/
		//이름 배지 생성
		const MemberBadge = document.createElement('div')
		MemberBadge.classList.add("team-member")
		MemberBadge.innerHTML=`
			<span>${member.email}</span>
			<span>${member.teamMateName}</span>
			<div class = "role-status"> 
				  ${
	        member.teamMateRole === "팀원" 
	        ? `<select>
	             <option value="팀원" selected>팀원</option>
	             <option value="팀장">팀장</option>
	           </select>`
	        : `<select>
	             <option value="팀장" selected>팀장</option>
	             <option value="팀원">팀원</option>
	           </select>`
	    	}
			</div>
				   <button type="button" class="reject-btn" data-email="${member.email}">삭제</button> 
		    <span class="deleteStatus" style="color: red; display: none;">삭제</span>
		`;
		
		let deleteStatus = false;
		
		// 삭제 버튼 선택 및 클릭 이벤트 추가
		const rejectBtn = MemberBadge.querySelector(".reject-btn");
		const deleteStatusSpan = MemberBadge.querySelector(".deleteStatus");
		
		rejectBtn.addEventListener("click", () => {
		    if (!deleteStatus) {
		        // "삭제" 상태로 변경
				MemberBadge.classList.add("removed"); // 삭제 클래스 추가
		        deleteStatusSpan.style.display = "inline"; // "삭제" 표시
		        rejectBtn.textContent = "삭제 취소"; // 버튼 텍스트 변경
		        deleteStatus = true; // 상태 업데이트
		    } else {
		        // "삭제 취소" 상태로 변경
				MemberBadge.classList.remove("removed"); // 삭제 클래스 삭제
		        deleteStatusSpan.style.display = "none"; // "삭제" 숨김
		        rejectBtn.textContent = "삭제"; // 버튼 텍스트 변경
		        deleteStatus = false; // 상태 업데이트
		    }
		});
		
		
		teamMemberArea.appendChild(MemberBadge)
		
	})
	

	
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
function isLeaderLeavingAvailable(modal, currentUserEmail){
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
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
    }
}
